import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import DiscordUser from "../database/schemas/discordUser.js";

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken);
      console.log(profile);

      try {
        const discordUser = await DiscordUser.findOne({
          discordId: profile.id,
        });
        if (discordUser) {
          console.log("user found");
          return done(null, discordUser);
        } else {
          console.log("creating new user");
          const newUser = await DiscordUser.create({ discordId: profile.id });
          return done(null, newUser);
        }
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    }
  )
);
