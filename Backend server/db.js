const mongoos = require("mongoose");
// require('dotenv').config;

// // mongoos.connect(process.env.mongo_URL).then(()=>{
// //     console.log('MongoDB Connected...');
// // })
// // .catch((err)=>{
// //     console.error("cannot connect"+err);
// // })
mongo_URL =''

mongoos.connect(mongo_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
