require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sequelize = require("./db");
const cors = require("cors");

const indexRouter = require("./routes/index");
const pizzasRouter = require("./routes/pizzas");
const stockRouter = require("./routes/stock");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/order");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const app = express();

app.use(
  cors({
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Access"],
    exposedHeaders: ["Authorization", "Access"],
    origin: ["http://localhost:3000"],
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/pizzas", pizzasRouter);
app.use("/stock", stockRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
};

start();

module.exports = app;
