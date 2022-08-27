import axios from "axios";

const url = "http://localhost:5000/posts";

const API = axios.create({ baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts/?page=${page}`);
export const fetchPostsByCreator = (id) => API.get(`/posts/creator/:id`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search/?searchText=${searchQuery.searchText || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const editPost = (post, id) => API.patch(`/posts/${id}`, post);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const signup = (formData) => API.post('/user/signup', formData);
export const signin = (formData) => API.post('/user/signin', formData);



