const express = require('express');
const port = 3030;
const cors = require('cors'); 
require('./db');
require('./model/user');
const authrout= require("./routes/authroute");

const app = express();
app.use(cors());
const bodyParser= require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

app.use(express.json()); // for parsing application/json
app.use(authrout);
app.use('/employephoto', express.static('employephoto'));

app.get('/' ,(req,res)=>{
    res.send("Welcome to the API");
})

app.post('/post',(req,res)=>{
     console.log(req.body);
    res.send("this is post");
})
app.listen(port,()=>{
    console.log("server is running on 3030");
})