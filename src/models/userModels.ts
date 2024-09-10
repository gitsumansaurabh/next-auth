import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide an username."],
    unique: true,
  },
  email: { type: String, required: [true, "Please provide an email."] },
  password: { type: String, required: [true, "Please provide a password."] },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgetPasswordToken: { type: String },
  forgetPasswordTokenExpiry: { type: Date },
  verifyToken: { type: String },
  verifyTokenExpiry: { type: Date },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
