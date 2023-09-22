import React from "react";
import { useSelector } from "react-redux";

import { PostsList } from "../components/PostsList";

export const MyPosts = () => {
  const posts = useSelector((state) => state.posts.posts.items);
  const authId = useSelector((state) => state.auth.data._id);
  console.log(posts);

  const postsWithAuth = posts.filter((item) => item.user._id === authId);
  console.log(postsWithAuth);
  const myPosts = true;
  return (
    <>
      <PostsList posts={postsWithAuth} isMyPosts={true} />
    </>
  );
};
