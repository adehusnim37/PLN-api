const Token = require("../Schema/TokenModel");
const User = require("../Schema/UserModel");
const Transaction = require("../Schema/TransactionModel");
const AppError = require("../AppError");

const validateToken = async (req, res, next) => {
  try {
    if (!req.body.token) {
      return next(new AppError("Token harus diisi", 400));
    }

    const cekToken = await Token.findOne({
      token: req.body.token,
    });

    if (cekToken) {
      if (cekToken.IsActivated === true) {
        return next(new AppError("Token kamu sudah digunakan", 403));
      }
    } else {
      return next(new AppError("Token kamu salah", 403));
    }

    const updatedToken = await Token.findOneAndUpdate(
      { token: req.body.token, IsActivated: false },
      { ActivatedAt: Date.now(), IsActivated: true },
      { new: true },
    );

    const findTokenID = await Transaction.findOne({ token: updatedToken._id });

    if (!findTokenID) {
      return next(new AppError("Transaksi Token kamu tidak valid", 403));
    }

    const user = await User.findOne({ transaction: findTokenID._id });

    if (!user) {
      return next(new AppError("ID Transaksi tidak valid", 404));
    }

    // Ensure Nominal is a valid number
    const transactionNominal = parseFloat(findTokenID.Nominal);

    if (isNaN(transactionNominal)) {
      // jika transactionNominal bukan number
      return next(new AppError("Nilai Nominal transaksi tidak valid", 400));
    }

    if (isNaN(user.saldo)) {
      // jika saldo bukan number, maka saldo di set menjadi 0
      user.saldo = 0;
    }

    user.saldo += transactionNominal;

    await user.save();

    res.status(200).json({
      status: "success",
      data: updatedToken,
      saldo: user.saldo,
      message: "Berhasil Aktivasi token",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

const convertToken = async (req, res, next) => {
  try {
    const idListrik = Number(req.params.idListrik);
    const user = await User.findOne({ idListrik: idListrik });
    if (!user) {
      return next(new AppError("ID Listrik tidak valid", 403));
    }
    if (user.Jenis === 1) {
      user.kwH = user.saldo * 0.75;
      user.saldo = 0;
    } else if (user.Jenis === 2) {
      user.kwH = user.saldo * 0.82;
      user.saldo = 0;
    } else if (user.Jenis === 3) {
      user.kwH = user.saldo * 0.88;
      user.saldo = 0;
    }
    await user.save();
    res.status(200).json({
      status: "success",
      saldo: user ? user.saldo : null,
      message: "Berhasil Konversi Token Menjadi Kwh",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

// create function to 
module.exports = { validateToken, convertToken };
