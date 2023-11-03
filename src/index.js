import express from "express";
import groceryRouter from "./routes/groceries.js";
import marketsRouter from "./routes/markets.js";

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const loggerMiddleWare = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

app.use(loggerMiddleWare);

app.use("/api/v1/groceries", groceryRouter);
app.use("/api/v1/markets", marketsRouter);

app.listen(PORT, () => {
  console.log(`server starter at port ${PORT}`);
});
