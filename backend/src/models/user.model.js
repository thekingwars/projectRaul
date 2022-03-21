import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullName: String,
  password: String,
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Student"],
    default: "Student",
  },
});

const User = model("User", userSchema);

export default User;
