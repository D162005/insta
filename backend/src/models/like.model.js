const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: "post",
        required: [true, "postId is required"]
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: [true, 'userId is required']
    }
},{
    timestamps:{
        timestamps:true
    }
})

likeSchema.index({postId:1,userId:1},{unique:true})

const likeModel = mongoose.model("likes",likeSchema)

module.exports = likeModel