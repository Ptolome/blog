import React, { useEffect, useState } from "react";

// import { postS } from "../api";
import axios from "../http/axios";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "./Post";
import { PostsList } from "./PostsList";
import { Pagination } from "./Pagination";
import { fetchPosts } from "../redux/slices/posts";

export const Posts = ({ match }) => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  // const [posts, setPosts] = useState([]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const count = posts.items.length;
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangePage = (pageIndex) => {
    console.log("pageIndex", pageIndex);
    setCurrentPage(pageIndex);
  };

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
  };

  const postsOnPage = paginate(posts.items, currentPage, pageSize);
  return (
    <>
      {posts.items.length > 0 ? (
        <>
          <PostsList posts={postsOnPage} />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handleChangePage}
          />
        </>
      ) : (
        "loading...."
      )}
    </>
  );
  // );
};
