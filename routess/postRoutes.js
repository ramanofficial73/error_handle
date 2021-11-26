const express = require('express')
const { createPost, fetchPosts, fetchPost, updatePost, updateValidations, updateImage, deletePost, Home, postDetails, postComment  } = require('../controller/postController')
const auth  = require('../Utils/Auth')
const router = express.Router()


router.post('/create_post',auth, createPost)
router.post('/update',auth, updateValidations, updatePost)
router.post('/updateImage',auth, updateImage )
router.post('/comment',auth, postComment )


router.get('/explore/:id', postDetails )
router.get('/posts/:id/:page',auth, fetchPosts)
router.get('/post/:id',auth, fetchPost)
router.get('/delete/:id',auth, deletePost)
router.get('/home/:page', Home)







module.exports = router