const postModel = require('../models/post.model')
const cookieParser = require('cookie-parser')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function postCreateController(req,res){

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'dummy',
        folder:'Insta_Clone'
    })

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })
}

async function getPostController(req,res){

    let userId = req.user.id
    
    const posts = await postModel.find({
        user:userId
    })

    res.status(200).json({
        message: "posts fatch successfully",
        posts
    })
}


async function getPostDetailsController(req,res){

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "post Not Found"
        })
    }

    const isUserValid = post.user.toString() == userId

    if(!isUserValid){
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    res.status(200).json({
        message: 'post Fatch Successfully',
        post
    })
}

module.exports = {
    postCreateController,
    getPostController,
    getPostDetailsController
}