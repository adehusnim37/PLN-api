const express = require("express");
const { getDatamail } = require("../Controller/MailController");

const tokenRouter = express.Router();

tokenRouter.route("/").post(getDatamail);

module.exports = tokenRouter;
