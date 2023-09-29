const { faker } = require("@faker-js/faker");
const User = require("../Schema/UserModel");
const Transaction = require("../Schema/TransactionModel");
const Token = require("../Schema/TokenModel");
const AppError = require("../AppError");

const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      idListrik: faker.number.int({ min: 100000000, max: 10000000000 }),
      Jenis: faker.number.int({ min: 1, max: 3 }),
    });
    const data = await newUser.save();
    res.status(201).json({
      status: "success",
      data: data,
      message: "berhasil membuat pelanggan baru",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const getAll = await User.find().populate("transaction");
    res.status(201).json({
      status: "success",
      data: getAll,
      message: "berhasil mendapatkan semua data pelanggan",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = { createUser, getAllUser };
