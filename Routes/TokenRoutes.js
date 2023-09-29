const express = require("express");
const {
  validateToken,
  convertToken,
} = require("../Controller/TokenController");

const tokenRouter = express.Router();

tokenRouter.route("/validate").post(validateToken);
tokenRouter.route("/kwh/:idListrik").get(convertToken);

module.exports = tokenRouter;
