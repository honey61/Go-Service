const mongoos = require("mongoose");
// require('dotenv').config;

// // mongoos.connect(process.env.mongo_URL).then(()=>{
// //     console.log('MongoDB Connected...');
// // })
// // .catch((err)=>{
// //     console.error("cannot connect"+err);
// // })
mongo_URL ='mongodb+srv://hs8126246:honey618@cluster0.p9eykvv.mongodb.net/?retryWrites=true&w=majority'

mongoos.connect(mongo_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
