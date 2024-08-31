const mongoose = require('mongoose')

const AlertSchema = mongoose.Schema({
    title :{
        type : String,
        required : false,
    },
    type : {
        type : String,
        required : false,
    },

    description :{
        type : String,
        required : false,
    },

    latitude :{
        type : Number,
        required : false,
      
    },

    longitude :{
        type : Number,
        required : false,
        
    },

    postedBy :{
        type : String,
        required : false,
    },

    active :{
        type: Boolean,
        default : true,
        required : false,
    },
    verified :{
        type : Boolean,
        default : false,
    },
},
    {
        timestamps : true,
    }


)


module.exports = mongoose.model('Alert',AlertSchema)