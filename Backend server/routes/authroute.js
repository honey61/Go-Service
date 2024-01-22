
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("user");

router.post("/signup", async (req, res) => {
  const { username, useremail, confpass, password } = req.body;

  if (!useremail || !password || !username || !confpass) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  try {
    const existingUser = await User.findOne({ useremail: useremail });

    if (existingUser) {
      return res.status(422).json({ error: "Email is already in use" });
    }

    const newUser = new User({
      username,
      useremail,
      confpass,
      password,
    });

    await newUser.save();
    res.json({ success: true, message: "User saved" });
  } catch (err) {
    console.log("DB error", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(422).json({ error: 'Invalid username or password' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
