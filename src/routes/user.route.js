const express = require('express')
const identifyUser = require('../middlewares/auth.middleware')
const userRouter = express.Router()
const userController = require('../controllers/user.controller')


userRouter.post('/follow/:userId', identifyUser, userController.followUserController)
userRouter.delete('/follow/:userId', identifyUser, userController.unFollowUserController)
userRouter.post('/follow/request/accept/:userId', identifyUser, userController.userFollowStatusAccepted)
userRouter.delete('/follow/request/reject/:userId', identifyUser, userController.userFollowStatusRejected)

module.exports = userRouter