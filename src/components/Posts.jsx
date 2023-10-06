import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostsList } from "./PostsList";
import { Pagination } from "./Pagination";
import { fetchPosts, fetchDeletePost } from "../redux/slices/posts";

export const Posts = ({ match }) => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const count = posts.items.length;
  const pageSize = 6;
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
};
