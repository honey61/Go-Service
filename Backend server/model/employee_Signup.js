const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confpass: {
        type: String,
        required: true,
    },
    useremail: {
        type: String,
        unique: true,
        required: true,
    },
    number: {
        type: Number,
        unique: true,
        // required: true,
    },
    adharnumber: {
        type: Number,
        unique: true,
        // required: true,
    },
    experience: {
        type: Number,
        default: 0,  // Set default value if not provided
    },
    profileImage: {
        type: String,
        default: "https://via.placeholder.com/150"
      },
    selectedCategory: {
        type: String,
        required: true,
    },
    selectedCity: {
        type: String,
        required: true,
        
    },
    selectedTown: {
        type: String,
        required: true,
        
    }
},
{ collection: "Employee_Signup" }); // Explicitly setting collection name

const Employee_Signup = mongoose.model("Employee_Signup", UserSchema);

module.exports = Employee_Signup;
