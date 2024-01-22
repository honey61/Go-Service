 # User Signup API

This API allows users to sign up for an account on our platform. It uses the Express framework for routing and Mongoose for interacting with the MongoDB database.

## Prerequisites

Before you can use this API, you will need to:

1. Install Node.js and npm.
2. Create a MongoDB database and collection.
3. Create a user model in Mongoose.

## Installation

To install the dependencies for this API, run the following command in your terminal:

```
npm install
```

## Usage

To use this API, you can send a POST request to the `/signup` endpoint with the following parameters:

* `username`: The username of the user.
* `useremail`: The email address of the user.
* `confpass`: The confirmed password of the user.
* `password`: The password of the user.

If all of the parameters are valid, the API will create a new user in the database and return a success message. Otherwise, it will return an error message.

## Code Explanation

The following is a step-by-step explanation of the code:

1. We import the necessary modules.

```javascript
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("user");
```

2. We define the route for the signup endpoint.

```javascript
router.post("/signup", async (req, res) => {
  // Remove or replace the following line
  // res.send("this is signup");

  const { username, useremail, confpass ,password } = req.body;
 
  if (!useremail || !password || !username || !confpass) {
    return res.status(422).send({ error: "Please fill all the fields" });
  }

  try {
    const savedUser = await User.findOne({ useremail: useremail });

    if (savedUser) {
      return res.status(422).send({ error: "Invalid Credentials" });
    }

    const newUser = new User({
      username, useremail, confpass ,password
    });

    await newUser.save();
    // Send the response after saving the user
    res.send("User saved");
  } catch (err

