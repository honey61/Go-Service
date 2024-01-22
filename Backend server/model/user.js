const mongoos = require('mongoose');

const Schema = new mongoos.Schema({
    username:{
        type : String,
        required: true,
    },
    password:{
        type : String,
        required : true,

    },
    confpass:{
        type:String,
        required:true,
    },
    useremail:{
        type :String ,
        unique :true,
    }
    
})

mongoos.model("user", Schema);
