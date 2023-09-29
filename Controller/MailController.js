const Mail = require("../Schema/mailSchema");
const AppError = require("../AppError");

const getDatamail = async (req, res) => {
  try {
    const get = await req.body;

    if (!get) {
      return next(new AppError("Mailgun tidak mengirim apapun", 400));
    }

    const mail = await Mail.create(get);
    res.status(200).json({
      status: "berhasil",
      data: { mail: mail },
      message: "berhasil mendapatkan semua mail",
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      data: "Null",
      message: err.message,
    });
  }
};

module.exports = { getDatamail };
