const Transaction = require("../Schema/TransactionModel");
const AppError = require("../AppError");
const User = require("../Schema/UserModel");
const Token = require("../Schema/TokenModel");
const { faker } = require("@faker-js/faker");

const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
    });
    res.status(200).json({
      status: "success",
      data: transaction,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

const getAllTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.find().populate("token");
    res.status(200).json({
      status: "success",
      data: transaction,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

const buyToken = async (req, res, next) => {
  try {
    // Validate the NomorListrik field
    if (!req.body.idListrik) {
      return next(new AppError("Nomor Listrik harus diisi", 400));
    }

    // Find the user by their NomorListrik
    const user = await User.findOne({ idListrik: req.body.idListrik });

    if (!user) {
      return next(new AppError("Token Listrikmu Salah", 403));
    }

    // Create a new token
    const newToken = await Token.create({
      token: faker.string.numeric(20),
    });

    // Create a new transaction
    const newTransaction = await Transaction.create({
      Nominal: req.body.Nominal,
      token: newToken._id,
      user: user._id, // Associate the transaction with the user
    });

    // Update the user to include the transaction
    user.transaction.push(newTransaction._id); // Push the transaction to the user's transaction array
    await user.save();

    // Send the response to the user
    res.status(201).json({
      status: "success",
      data: newTransaction,
      tokenData: newToken,
      message: "berhasil membeli token",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = { getTransaction, getAllTransaction, buyToken };
