import { action, computed, createStore, thunk } from "easy-peasy";
import { api } from "./api/post";

export default createStore({
  posts: [],
  setPosts: action((state, payload) => {
    state.posts = payload;
  }),
  postTitle: "",
  setPostTitle: action((state, payload) => {
    state.postTitle = payload;
  }),
  postBody: "",
  setPostBody: action((state, payload) => {
    state.postBody = payload;
  }),
  editTitle: "",
  setEditTitle: action((state, payload) => {
    state.editTitle = payload;
  }),
  editBody: "",
  setEditBody: action((state, payload) => {
    state.editBody = payload;
  }),
  search: "",
  setSearch: action((state, payload) => {
    state.search = payload;
  }),
  searchResults: [],
  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),
  postCount: computed((state) => state.posts.length),
  getPostById: computed((state) => {
    return (id) => state.posts.find((post) => post.id === id);
  }),
  savePost: thunk(async (actions, newPost, helpers) => {
    const { posts } = helpers.getState();
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      actions.setPosts(allPosts);
      actions.setPostBody("");
      actions.setPostTitle("");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),
  deletePost: thunk(async (actions, id, helpers) => {
    try {
      const { posts } = helpers.getState();
      await api.delete(`/posts/${id}`);
      const filterPosts = posts.filter((post) => post.id !== id);
      actions.setPosts(filterPosts);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),
  editPost: thunk(async (actions, updatedPost, helpers) => {
    try {
      const { posts } = helpers.getState();
      const { id } = updatedPost;
      const response = await api.put(`/posts/${id}`, updatedPost);
      const allPosts = posts.map((post) =>
        post.id === id ? { ...response.data } : post
      );
      actions.setPosts(allPosts);
      actions.setEditTitle("");
      actions.setEditBody("");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),
});
