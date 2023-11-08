import passport from "passport";
import LocalStrategy from "passport-local";
import user from "../database/schemas/user.js";
import { comparePassword } from "../utils/helper.js";

passport.serializeUser((user, done) => {
  console.log("serializing user...");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializing user...");
  console.log(id);
  try {
    const User = await user.findById(id);
    if (!User) throw new Error("user not found");
    return done(null, User);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
  // done();
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        if (!email || !password) {
          throw new Error("missing credentials");
        }
        const userDb = await user.findOne({ email });
        if (!userDb) {
          throw new Error("user not found");
        }
        const isValid = comparePassword(password, userDb.password);

        if (isValid) {
          console.log("Authenticated sucessfully!");
          done(null, userDb);
        } else {
          console.log("Authenticafion Failed!");
          done(null, null);
        }
      } catch (err) {
        done(err, null);
      }
      // console.log(email);
      // console.log(password);
    }
  )
);
