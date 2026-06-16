const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')
const identifyUser = require('../middlewares/auth.middleware')

async function followUserController(req,res){

    const followerId = req.user.id
    const followeeId = req.params.userId

    const isFolloweeIdExist = await userModel.findById(followeeId)

    if(!isFolloweeIdExist){
        return res.status(404).json({
            message: "followee is not found"
        })
    }

    if(followerId === followeeId){
        return res.status(400).json({
            message: `use can't follow yourself` 
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower:followerId,
        followee:followeeId
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message: `you are already following ${isFolloweeIdExist.userName}`
        })
    }

    const followRecord = await followModel.create({
        follower: followerId,
        followee: followeeId
    }) 

    res.status(201).json({
        message: `you are now following ${isFolloweeIdExist.userName}`,
        followDetails:followRecord
    })
}

async function unFollowUserController(req,res){

    const followerId = req.user.id
    const followeeId = req.params.userId

    const isFolloweeIdExist = await userModel.findById(followeeId)

    if(!isFolloweeIdExist){
        return res.status(404).json({
            message: "User you are trying to Unfollow does not exist"
        })
    }

    const isFollowRecoredExist = await followModel.findOne({
        follower:followerId,
        followee:followeeId
    }) 

    if(!isFollowRecoredExist){
        return res.status(200).json({
            message: `You are not following the ${(await userModel.findById(followeeId)).userName}`
        })
    }

    const followRecord = await followModel.findOneAndDelete({
        follower:followerId,
        followee:followeeId
    })

    res.status(200).json({
        message: `user successfully Unfollow the ${isFolloweeIdExist.userName}`,
        UnfollowRecord:followRecord 
    })


}


async function userFollowStatusAccepted(req,res){

    const followerId = req.user.id
    const followeeId = req.params.userId

    const isFolloweeExist = await userModel.findById(followeeId)

    if(!isFolloweeExist){
        return res.status(404).json({
            message:'followee user not found'
        })
    }

    const isRequestExist = await followModel.findOne({
        follower:followeeId,
        followee:followerId
    })

    if(!isRequestExist){
        return res.status(403).json({
            message: "request not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower:followerId,
        followee:followeeId
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message: `you are already follow the ${isFolloweeExist.userName}`
        })
    }

    const acceptedFollowRecord = await followModel.create({
        follower:followerId,
        followee:followeeId,
        status: 'accepted'
    })
    const updateFolloweeStatus = await followModel.findByIdAndUpdate(isRequestExist._id,{status:'accepted'})

    res.status(201).json({
        message: `you successfully accepted the ${isFolloweeExist.userName} following request`,
        newFollowRecord: acceptedFollowRecord,
    })
}

async function userFollowStatusRejected(req,res){

    const followerId = req.user.id
    const followeeId = req.params.userId

    const isFolloweeExist = await userModel.findById(followeeId)

    if(!isFolloweeExist){
        return res.status(404).json({
            message: "followee user not found"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower:followerId,
        followee:followeeId
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message: `you are already following the ${isFolloweeExist.userName}` 
        })
    }

    const isRequestExist = await followModel.findOne({
        follower: followeeId,
        followee: followerId
    })

    if(!isRequestExist){
        return res.status(403).json({
            message: "request not exist"
        })
    }

    const updateFolloweeStatus =await followModel.findByIdAndDelete(isRequestExist._id)

    res.status(200).json({
        message: `you suucessfull rejected the ${isFolloweeExist.userName} following request`,
        updatedFollowRecord: updateFolloweeStatus
    })
}

module.exports = {
    followUserController,
    unFollowUserController,
    userFollowStatusAccepted,
    userFollowStatusRejected
}