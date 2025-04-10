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
        // required: true,
    },
    selectedCity: {
        type: String,
        
    },
    selectedTown: {
        type: String,
        
    }
});

module.exports = mongoose.model("user", UserSchema);


// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   useremail: {
//     type: String,
//     required: true,
//     unique: true // Ensure uniqueness of email
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   number: {
//     type: String,
//     required: true
//   },
//   adharnumber: {
//     type: String,
//     required: true
//   },
//   experience: {
//     type: String,
//     required: true
//   },
//   profileImage: {
//     type: String, // Store the path or URL of the image
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
