import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

import { useDispatch, useSelector } from "react-redux";

import { fetchAuth, selectorIsAuth } from "../redux/slices/auth";
import { Redirect } from "react-router-dom";

export const Login = () => {
  const isAuth = useSelector(selectorIsAuth);
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотябы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру",
      },
      min: {
        message: "Пароль должен быть больше 8 символов",
        value: 8,
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    const info = await dispatch(fetchAuth(data));
    if (!info.payload) {
      return alert("Произошла ошибка! Вы не авторизованны!");
    }
    if ("token" in info.payload) {
      window.localStorage.setItem("token", info.payload.token);
    }
  };
  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3 shadow p-4">
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Эдектронная почта"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>

          <TextField
            label="Password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            error={errors.password}
          />

          <button
            type="submit"
            className="btn btn-primary w-100 mt-4"
            disabled={!isValid}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
