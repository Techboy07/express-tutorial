import { Router } from "express";
import user from "../database/schemas/user.js";
import { hashPassword } from "../utils/helper.js";
import passport from "passport";
const router = Router();
import { authRegisterController } from "../controllers/auth.js";

// router.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) res.send(400);
//   const userDb = user.findOne({ email });
//   if (!userDb) res.send(401);
//   const isValid = comparePassword(password, userDb.password);
//   if (isValid) {
//     console.log("Authenticated sucessfully!");
//     req.session.user = userDb;
//     res.send(200);
//   } else {
//     console.log("Authenticafion Failed!");
//     res.send(401);
//   }
// });

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("logged in");

  res.status(200).send(req.session);
});

router.post("/register", authRegisterController);
router.get(
  "/discord",
  passport.authenticate("discord") /*, (req, res) => {
  res.status(200).send("ok");
}*/
);
router.get(
  "/discord/redirect",
  passport.authenticate("discord"),
  (req, res) => {
    res.send(200);
  }
);

export default router;
