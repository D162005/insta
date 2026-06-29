const postModel = require('../models/post.model')
const likeModel = require('../models/like.model')
const cookieParser = require('cookie-parser')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const identifyUser = require('../middlewares/auth.middleware')
const followModel = require('../models/follow.model')

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function postCreateController(req,res){

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'instaFile',
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
    
    const posts = await Promise.all ((await postModel.find({
        user:userId
    }).populate('user').lean())
    .map(async(post)=>{
        const isLiked = await likeModel.findOne({
            postId:post._id,
            userId:userId
        })
        
        post.isLiked = !!isLiked

        const isFollow = await followModel.findOne({
            follower:userId,
            followee:post.user.id
        })

        post.isFollow = !!isFollow

        return post
    }))
    

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

async function createLikePostController(req,res){
    
    const postId = req.params.postId
    const userId = req.user.id

    const isPostExist = await postModel.findById(postId)

    if(!isPostExist){
        return res.status(404).json({
            message: 'post not found'
        })
    }

    const isLikeExist = await likeModel.findOne({
        postId:postId,
        userId:userId
    })

    if(isLikeExist){
        return res.status(200).json({
            message: "you already like the post"
        })
    }

    const likeRecord = await likeModel.create({
        postId:postId,
        userId:userId
    })

    res.status(201).json({
        message: "you successfully like the post",
        likePostDetails:likeRecord
    })
}

async function createUnlikePostController(req,res){

    const postId = req.params.postId
    const userId = req.user.id

    const isPostExist = await postModel.findById(postId)

    if(!isPostExist){
        return res.status(404).json({
            message: 'post Not Found'
        })
    }

    const isLikeExist = await likeModel.findOne({
        postId:postId,
        userId:userId
    })

    if(!isLikeExist){
        return res.status(200).json({
            message: "you are not liked the post (already unlike the post)"
        })
    }

    const likeRecord = await likeModel.findByIdAndDelete(isLikeExist._id)

    res.status(204).json({
        message:"successfully Unlike the post",
        likeRecord
    })
}

async function getAllPostsController(req,res){
    const userId = req.user.id
    const posts = await Promise.all((await postModel.find().populate('user').lean())
        .map(async (post)=>{
            const isLiked = await likeModel.findOne({
                postId:post._id,
                userId:userId
            })

            post.isLiked = !!isLiked

            const isFollow = await followModel.findOne({
                follower:userId,
                followee:post.user._id
            })

            post.isFollow = !!isFollow
            return post
        }))

    res.status(200).json({
        message:'posts are fatch successfully',
        posts
    })
}

module.exports = {
    postCreateController,
    getPostController,
    getPostDetailsController,
    createLikePostController,
    createUnlikePostController,
    getAllPostsController
}