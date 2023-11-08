import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
//  Routes
import groceryRouter from "./routes/groceries.js";
import marketsRouter from "./routes/markets.js";
import authRouter from "./routes/auth.js";

import "./database/index.js";
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "kajjdjjddjjdkeikeiiekdokddodk",
    resave: false,
    saveUni1tialized: false,
  })
);
app.use(passport.authenticate("session"));
import "./strategies/local.js";

const loggerMiddleWare = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

app.use(loggerMiddleWare);

app.use("/api/v1/auth", authRouter);

app.use((req, res, next) => {
  console.log(req.user);
  if (req.user) {
    next();
  } else res.send(401);
});

app.use("/api/v1/groceries", groceryRouter);
app.use("/api/v1/markets", marketsRouter);
app.listen(PORT, () => {
  console.log(`server starter at port ${PORT}`);
});
