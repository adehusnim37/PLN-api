const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const userRoutes = require("./Routes/UserRoutes");
const tokenRoutes = require("./Routes/TokenRoutes");
const transactionRoutes = require("./Routes/TransactionRoutes");
const mailRoutes = require("./Routes/mailRoutes");
require("dotenv").config();

const app = express();
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/token", tokenRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/receivemail", mailRoutes);

module.exports = app;
