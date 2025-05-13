
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET ="vnbgfhghbghntjb23454364(){}[]:;'?/.,+-";
const multer = require('multer');
const User_Signup = require("../model/user_Signup");
const Employee_Signup = require("../model/employee_Signup");

// const User = require('./models/User'); // Assuming you have a User model

const storage = multer.diskStorage({
  destination: './employephoto', // Directory to save images
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and JPG files are allowed'), false);
  }
};

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});


/////////////////////////////////////////////////////
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};
/////////////////////////////////////////////

/////////////////////////////////////////////////
router.post("/signup", async (req, res) => {
  const { username, useremail, confpass, password } = req.body; //taking  data from the request body 
  console.log(req.body);
  if (!useremail || !password || !username || !confpass ) //looking that all values is been field or not 
  {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  try {
    
    const existingUser = await User_Signup.findOne({ useremail: useremail }); //checking weather this email already exist in database or not

    if (existingUser) {
      return res.status(422).json({ error: "Email is already in use" });
    }
    
      const  hashedPassword = await bcrypt.hash(password, 10);  //encrypt password
    const newUser = new User_Signup({// user schema to creata  a new user with the given details
      username,
      useremail,
      confpass,
      password: hashedPassword,
      
    });

  
    await newUser.save();//save data in backend
    res.json({ success: true, message: "User saved" });
  } catch (err) {
    console.log("DB error", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
////////////////////////////




router.post("/Esignup", upload.single('profileImage'), async (req, res) => {
  const { 
    username,
    useremail,
    password,
    confpass,
    number,
    adharnumber,
    experience,
    selectedCategory,
    selectedCity,
    selectedTown
  } = req.body;

  // Get the uploaded file info
  const profileImage = req.file ? req.file.path : null;

  console.log("Received data:", { ...req.body, profileImage: req.file });

  // Check if all required fields are provided
  if (!username || !useremail || !password || !confpass || !number || !adharnumber || !experience || !selectedCategory) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  // Check if password and confirm password match
  if (password !== confpass) {
    return res.status(422).json({ error: "Passwords do not match" });
  }

  try {
    // Check if the user with the provided email already exists
    const existingUser = await Employee_Signup.findOne({ useremail: useremail });
    if (existingUser) {
      return res.status(422).json({ error: "Email is already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new Employee_Signup({
      username,
      useremail,
      password: hashedPassword,
      confpass, // Note: You might not need to store confpass separately
      number,
      adharnumber,
      experience,
      selectedCategory,
      selectedCity,
      selectedTown,
      profileImage: profileImage ? profileImage.replace(/\\/g, '/') : null // Store the file path
    });

    // Save the new user to the database
    await newUser.save();
    
    // Send success response
    res.json({ 
      success: true, 
      message: "User registered successfully",
      user: {
        username,
        useremail,
        profileImage: profileImage ? profileImage.replace(/\\/g, '/') : null
      }
    });
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});






router.post('/userlogin', async (req, res) => {
  const { useremail, password } = req.body; // getting data from login form
console.log(useremail);
  try {
    const user = await User_Signup.findOne({ useremail: useremail }); // find user by email
   
    if (!user) {
      return res.status(422).json({ error: 'Invalid user Email or password' });
    }
//checking password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(422).json({ error: 'Invalid userEmail or password' });
    }
    //generatw token
    const token = jwt.sign({useremail},JWT_SECRET);
    //sending token back to clien
    res.json({token});
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





router.post('/Elogin', async (req, res) => {
  const { useremail, password } = req.body; // getting data from login form

  try {
    const user = await Employee_Signup.findOne({ useremail: useremail }); // find user by email
   
    if (!user) {
      return res.status(422).json({ error: 'Invalid user Email or password' });
    }
//checking password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(422).json({ error: 'Invalid userEmail or password' });
    }
    //generatw token
    const token = jwt.sign({useremail},JWT_SECRET);
    //sending token back to clien
    res.json({token});
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
///////////////////////////////////
///////////////////////////////////

router.get('/users', async (req, res) => {
  try {
    const { 
      selectedCategory,
      selectedCity,selectedTown } = req.query;
    console.log(selectedCategory,
      selectedCity,selectedTown);
    
    // if (!service || !city || !town) {
      if (!selectedCategory || !selectedCity || !selectedTown) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // const users = await User.find({ service, city, town });
    const users = await Employee_Signup.find({ selectedCategory,
      selectedCity,selectedTown});
  //  const s = json(users);
  //  console.log(s);
    res.json(users);
  
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


//////////////////////////////////////////
router.get('/user-data', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, JWT_SECRET);
    const data = await User_Signup.find({ useremail: user.useremail });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ success: false, error: 'Error fetching user data' });
  }
});
//////////////////////////////////////////


///////////////////////////////////////////////////
router.get('/Employeeuser-data', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);
    const data = await Employee_Signup.find({ useremail: user.useremail });
    console.log(data)
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ success: false, error: 'Error fetching user data' });
  }
});
//////////////////////////////////////////
router.post('/update-profile', async (req, res) => {
  const { username, useremail, number, adharnumber, experience, profileImage } = req.body;
  try {
    const existingUser = await Employee_Signup.findOne({ useremail: useremail });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    existingUser.username = username || existingUser.username;
    existingUser.number = number || existingUser.number;
    existingUser.adharnumber = adharnumber || existingUser.adharnumber;
    existingUser.experience = experience || existingUser.experience;
    existingUser.profileImage = profileImage || existingUser.profileImage;

    await existingUser.save();

    res.json({ success: true, message: 'Profile updated successfully', user: existingUser });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
