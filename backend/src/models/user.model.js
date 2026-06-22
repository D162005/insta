const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique:[true,'username already exist'],
        required:[true,'username is required']
    },
    email:{
        type:String,
        unique:[true,'email already exist'],
        required:[true,'email is required'],
        select:false
    },
    password:{
        type:String,
        unique:[true,'password already exist'],
        required:[true,'password is required']
    },
    bio:{
        type:String
    },
    profileImage:{
        type:String,
        default:'https://ik.imagekit.io/D16/Insta_Clone/Default_pfp.jpg?updatedAt=1781362596985'
        
    }
} )

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;