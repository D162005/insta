const express = require('express')
const postController = require('../controllers/post.controller')
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require('../middlewares/auth.middleware')


const postRouter = express.Router()

postRouter.post('/',upload.single("dummy"), identifyUser, postController.postCreateController)
postRouter.get('/', identifyUser, postController.getPostController)
postRouter.get('/details/:postId', identifyUser, postController.getPostDetailsController)
postRouter.post('/like/:postId', identifyUser, postController.createLikePostController)
postRouter.delete('/unlike/:postId',identifyUser, postController.createUnlikePostController)

module.exports = postRouter