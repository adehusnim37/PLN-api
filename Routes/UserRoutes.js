const express = require("express");
const {
  createUser,
  buyToken,
  getAllUser,
} = require("../Controller/userController");

const userRouter = express.Router();

userRouter.route("/").post(createUser).get(getAllUser);

module.exports = userRouter;
