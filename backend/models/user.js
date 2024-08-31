const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        default : "",
        required : true,
    },

    email : {
        type : String,
        default : "",
        requirerd : true,
    },

    password : {
        type : String,
        default : "",
        required : true,
    },
    mobile :{
        type : String,
        default : "",
        required : true,
        maxLength : 10,
    },

    role :{
        type : Number,
        default : 0,
        required : true,
    },
},
    {
        timestamps : true
    }
)

module.exports = mongoose.model('User',UserSchema)