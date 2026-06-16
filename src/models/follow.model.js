const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower:{
        type: mongoose.Schema.ObjectId,
        ref:"users",
        required: [true , "Follower is Required"]
    },
    followee:{
        type: mongoose.Schema.ObjectId,
        ref:"users",
        required:[true, "followee is required"]
    },
    status:{
        type:String,
        default:'pending',
        enum:{
            values:['pending','accepted','rejected'],
            message:"status can only be pending, accepted or rejected"
        }
    }
},{
    timestamps:{
        timestamps:true
    }
})

followSchema.index({follower:1, followee:1},
    {unique: true}
)

const followModel = mongoose.model("follows",followSchema)

module.exports = followModel