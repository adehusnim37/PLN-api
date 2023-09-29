const express = require("express");
const {
  getTransaction,
  getAllTransaction,
  buyToken,
} = require("../Controller/TransactionController");

const transactionRouter = express.Router();

transactionRouter.route("/").get(getAllTransaction);
transactionRouter.route("/beliToken").post(buyToken);

transactionRouter.route("/:id").get(getTransaction);

module.exports = transactionRouter;
