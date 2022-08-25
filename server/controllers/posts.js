import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';

const getPosts = async (req, res) => {
  try {
    const { page } = req.query
    const limit = process.env.LIMIT_DOC
    const start_index = (page-1)*limit
    const totalDoc = await PostMessage.countDocuments()
    const posts = await PostMessage.find().sort({_id: -1}).limit(limit).skip(start_index)
 
    res.status(200).json({
      data: posts,
      currentPage: page,
      numberOfPages:  Math.ceil(totalDoc / limit)
    });
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: err.message });
  }
};

const getPostsByCreator = async (req, res) => {
  try {
    const { id } = req.params


    const data = await PostMessage.find({creator_id: id})
 
    res.status(200).json(data);
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const data = await PostMessage.findOne({_id: id})
    res.status(200).json(data);
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: err.message });
  }
};


const getPostsBySearch = async (req, res) => {
  const { searchText, tags } = req.query
  try {
    const title = new RegExp(searchText, 'i')
    const posts = await PostMessage.find({  $or: 
    [
      {title},
      {tags: {$in: tags.split(',')}}
    ]})

    console.log(posts)
 
    res.status(200).json({
      data: posts
    });
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: err.message });
  }
};
const createPost = async (req, res) => {
  try {
    const newPostMessage = new PostMessage({
      creator_id: req.userId,
      ...req.body
    })

    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  console.log(req.params)
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

const likePost = async (req, res) => {
  try {
    const post = await PostMessage.findById(req.params.id)

    const index = post.likes.findIndex(id => id==req.userId)
    console.log(req.userId)
    if(index === -1) 
      post.likes.push(req.userId)
    else
    post.likes = post.likes.filter(id => id != req.userId) 

    await post.save()
    res.json(post)
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await PostMessage.findByIdAndDelete(req.params.id)
    console.log('delete post api')
    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export { getPost, getPosts, createPost, editPost, likePost, deletePost, getPostsBySearch, getPostsByCreator };
