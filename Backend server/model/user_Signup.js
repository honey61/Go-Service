const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  useremail: { type: String, required: true, unique: true },
  confpass: { type: String, required: true },
  password: { type: String, required: true }
}, { collection: "User_Signup" }); // Explicitly setting collection name

const User_Signup = mongoose.model("User_Signup", userSchema);

module.exports = User_Signup;