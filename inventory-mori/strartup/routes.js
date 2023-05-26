const express = require("express");
const cors = require("cors");

const authRouter = require("../routes/auth");
const userRouter = require("../routes/user");
const productRouter = require("../routes/product");
const consumerouter = require("../routes/consume");

module.exports = function (app) {
  app.set("trust proxy", 1);
  app.use(cors());
  app.use(express.json());
  app.use("/api/v0/auth", authRouter);
  app.use("/api/v0/user", userRouter);
  app.use("/api/v0/product", productRouter);
  app.use("/api/v0/consume", consumerouter);
};
