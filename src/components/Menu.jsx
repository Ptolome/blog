import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectorIsAuth } from "../redux/slices/auth";

export const Menu = () => {
  const isAuth = useSelector(selectorIsAuth);
  const changeBgRef = useRef();
  const dispatch = useDispatch();
  const handleChange = () => {
    const bgColor = [
      "LightYellow",
      "pink",
      "Lavender",
      "PaleGreen",
      "LightCyan",
    ];
    changeBgRef.current.style.backgroundColor = `${
      bgColor[Math.floor(Math.random() * bgColor.length)]
    }`;
  };

  const onClickLogout = () => {
    if (window.confirm("Вы точно хотите выйти из аккаунта?")) {
      dispatch(logout());
      window.localStorage.clear("token");
    }
  };
  return (
    <ul
      className="nav"
      ref={changeBgRef}
      onClick={handleChange}
      style={{ cursor: "pointer" }}
    >
      {isAuth ? (
        <li className="nave-item">
          <button
            onClick={onClickLogout}
            className="btn btn-danger"
            style={{
              color: "white",
              backgroundColor: "red",
              border: "1px solid white",
            }}
          >
            Выход из аккаунта
          </button>
        </li>
      ) : (
        <li className="nave-item">
          <Link
            className="nav-link"
            to="/login"
            style={{
              color: "white",
              backgroundColor: "green",
              border: "1px solid white",
            }}
          >
            Вход в аккаунт
          </Link>
        </li>
      )}

      {!isAuth && (
        <li className="nave-item">
          <Link className="nav-link" to="/register">
            Регистрация
          </Link>
        </li>
      )}

      <li className="nave-item">
        <Link className="nav-link" to="/">
          Главная
        </Link>
      </li>

      {isAuth && (
        <li className="nave-item">
          <Link className="nav-link" to="/account">
            Личный кабинет
          </Link>
        </li>
      )}

      {/*<Link to=""></Link> */}
    </ul>
  );
};
