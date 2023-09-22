import React from "react";

import { Link } from "react-router-dom";

export const PostsList = ({ posts, isMyPosts }) => {
  // let isMyPosts = true;
  return (
    <>
      {!isMyPosts ? (
        <>
          <h2>List of posts</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {posts.map((item) => (
              <Link key={item._id} to={"/posts/" + item._id}>
                <div className="col" key={item._id}>
                  <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text"> {item.text.substr(0, 30)}</p>
                      Автор
                      <span className="badge rounded-pill bg-light text-dark">
                        {item.user.fullName + " " + item.updatedAt.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>List of posts</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {posts.map((item) => (
              <div>
                <div className="col" key={item._id}>
                  <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text"> {item.text}</p>
                      Автор
                      <span className="badge rounded-pill bg-light text-dark">
                        {item.user.fullName + " " + item.updatedAt.slice(0, 10)}
                      </span>
                    </div>
                    <button className="btn btn-danger">удалить</button>
                    <button className="btn btn-info">редактировать</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
