import { FETCH_POST_BY_CREATOR, FETCH_POST, FETCH_ALL, CREATE_POST, EDIT_POST, LIKE_POST, DEL_POST, END_LOADING, START_LOADING, FETCH_ALL_BY_SEARCH } from "../constraint/actionTypes";
import * as api from "../api";

const getPost = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(page);
    console.log(123)
    dispatch({
      type: FETCH_POST,
      payload: data
    });
  } catch (err) {
    console.log(err.message);
  }
};

const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
    dispatch({
      type: FETCH_ALL,
      payload: {
        data,
        currentPage,
        numberOfPages
      }
    });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err.message);
  }
};

const getPostsByCreator = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPostsByCreator(id);
    console.log(123)
    dispatch({
      type: FETCH_POST_BY_CREATOR,
      payload: data
    });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err.message);
  }
};

const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    console.log(searchQuery)
    dispatch({ type: START_LOADING });
    const { data: {data} } = await api.fetchPostsBySearch(searchQuery);
    console.log('data: ',data)
    dispatch({
      type: FETCH_ALL_BY_SEARCH,
      payload: data
    });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err.message);
  }
};

const createPost = (newPost) => async (dispatch) => {
  dispatch({ type: START_LOADING });

  try {
    const { data } = await api.createPost(newPost);
    dispatch({
      type: CREATE_POST,
      payload: data,
    });
    // console.log('done create posts')

    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err.message);
  }
};

const editPost = (post, id) => async (dispatch) => {
  try {
    const { data } = await api.editPost(post, id);
    dispatch({
      type: EDIT_POST,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({
      type: LIKE_POST,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
  }
};
        
const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    console.log(1)
    dispatch({
      type: DEL_POST,
      payload: id,
    });
  } catch (err) {
    console.log(err.message);
  }
};
        
        
export {getPost, getPosts, createPost, editPost, likePost, deletePost, getPostsBySearch, getPostsByCreator };





