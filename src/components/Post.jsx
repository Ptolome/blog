import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const Post = () => {
  const { posts } = useSelector((state) => state.posts);

  const id = useParams();

  const { items } = posts;

  const post = items.find((item) => item._id === id.id);

  return id ? (
    <>
      <div>
        <h2>Post</h2>
        <div className="col" key={post._id}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text"> {post.text.substr(0, 10)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={post.user.avatarUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.text}</p>
          <Link to="/" className="btn btn-primary">
            Перейти ко всем постам
          </Link>
        </div>
      </div>
    </>
  ) : (
    "loading..."
  );
};
