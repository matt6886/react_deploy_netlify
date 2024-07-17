import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import { useHistory } from "react-router-dom";

const NewPost = () => {
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);
  const posts = useStoreState((state) => state.posts);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);
  const savePost = useStoreActions((actions) => actions.savePost);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = (posts.length > 0 ? posts.length + 1 : 1) + "";
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, datetime, title: postTitle, body: postBody };
    savePost(newPost);
    history.push("/");
  };

  return (
    <main className="NewPost">
      <h2>NewPost</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title: </label>
        <input
          id="postTitle"
          required
          type="text"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label id="postBody">Post: </label>
        <textarea
          id="postBody"
          required
          type="text"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
