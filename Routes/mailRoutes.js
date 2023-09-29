const express = require("express");
const { getDatamail } = require("../Controller/MailController");

const mailRouter = express.Router();

mailRouter.route("/").post(getDatamail);

module.exports = mailRouter;
