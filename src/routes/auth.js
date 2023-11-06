import { Router } from "express";
import user from "../database/schemas/user.js";
const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    if (req.session.user) {
      res.send(req.session.user);
    } else {
      req.session.user = {
        username,
      };
      res.send(req.session);
    }
  } else {
    res.send(401);
  }
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const userDb = await user.findOne({ $or: [{ username }, { email }] });
  if (userDb) {
    res.status(400).send({ msg: "User already exists!" });
  } else {
    const newUser = await user.create({ username, password, email });
    newUser.save();
    res.send(201);
  }
});
export default router;
