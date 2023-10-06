import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link, Redirect } from "react-router-dom/cjs/react-router-dom";

import { PostsList } from "../components/PostsList";
import TextField from "../components/textField";
import { fetchDeletePost, fetchPosts } from "../redux/slices/posts";

export const MyPosts = () => {
  const posts = useSelector((state) => state.posts.posts.items);
  const authId = useSelector((state) => state.auth.data._id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Do you realy wont to delete this post?")) {
      dispatch(fetchDeletePost(id));
    }
  };
  const handleChangePost = (id) => {
    return <Redirect to="/posts" />;
  };

  const postsWithAuth = posts.filter((item) => item.user._id === authId);

  return (
    <>
      <PostsList
        posts={postsWithAuth}
        isMyPosts={true}
        onDelete={handleDelete}
        onChangePost={handleChangePost}
      />
      <Link to="/account/create">
        <div className="btn btn-success mt-3">Написать статью</div>
      </Link>
    </>
  );
};
