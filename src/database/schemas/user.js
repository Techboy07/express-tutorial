import { Schema, SchemaTypes, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  password: {
    type: SchemaTypes.String,
    required: true,
  },

  createdAt: {
    type: SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});

export default model("users", UserSchema);
