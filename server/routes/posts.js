import express from 'express'

import { getPosts, createPost, editPost, likePost, deletePost, getPostsBySearch, getPost, getPostsByCreator} from '../controllers/posts.js'

import authMiddleware from '../middlewares/auth.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/search', getPostsBySearch)
router.get('/creator/:id', getPostsByCreator)
router.get('/:id', getPost)
router.post('/', authMiddleware, createPost)
router.patch('/:id/likePost', authMiddleware, likePost)
router.patch('/:id', authMiddleware, editPost)
router.delete('/:id', authMiddleware, deletePost)


export default router