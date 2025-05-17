import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  oauthId: { type: String, required: true },
  provider: { type: String, required: true },
  name: String,
  email: String,
  photo: String,
});

const User = mongoose.model("User", userSchema);
export default User;
