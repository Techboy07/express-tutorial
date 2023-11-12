import { hashPassword } from "../utils/helper.js";
import user from "../database/schemas/user.js";

export const authRegisterController = async (req, res) => {
  const { email } = req.body;

  const userDb = await user.findOne({ email });
  if (userDb) {
    res.status(400).send({ msg: "User already exists!" });
  } else {
    const password = hashPassword(req.body.password);
    console.log(password);
    const newUser = await user.create({ password, email });
    newUser.save();
    res.send(201);
  }
};
