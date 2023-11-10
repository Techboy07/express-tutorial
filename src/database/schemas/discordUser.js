import { Schema, SchemaTypes, model } from "mongoose";

const DiscordUserSchema = new Schema({
  discordId: {
    type: SchemaTypes.String,
    required: true,
  },

  createdAt: {
    type: SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});

export default model("discord_users", DiscordUserSchema);
