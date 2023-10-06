import React, { useEffect } from "react";
import TextField from "./textField";
import { useState } from "react";
import axios from "../http/axios";
import { Redirect, useParams } from "react-router-dom";

export const ChangePage = () => {
  const { id } = useParams();

  const [dataForm, setDataForm] = useState({ title: "", text: "", tags: "" });

  const isId = Boolean(id);
  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setDataForm({
          title: data.title,
          text: data.text,
          tags: data.tags.join("," || " "),
        });
      });
    }
  }, []);
  const error = [];
  const handleChange = ({ target }) => {
    setDataForm((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataPost = {
        title: dataForm.title,
        text: dataForm.text,
        tags: dataForm.tags,
      };

      isId
        ? (await axios.patch(`/posts/${id}`, dataPost), alert("Пост обнавлен"))
        : (await axios.post("/posts", dataPost), window.alert("Пост создан"));
    } catch (err) {
      window.alert("Пост не создан!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          type={"text"}
          name={"title"}
          label={"TITLE"}
          value={dataForm.title}
          onChange={handleChange}
        />

        <TextField
          type={"text"}
          name={"tags"}
          label={"TAGS"}
          value={dataForm.tags}
          onChange={handleChange}
        />
        <div>
          <div>TEXT</div>
          <textarea
            name="text"
            value={dataForm.text}
            onChange={handleChange}
            rows="10"
            style={{ width: "100%", boxsizing: "border-box" }}
          ></textarea>
        </div>

        {/* <Link to="/account"> */}
        <button
          type="submit"
          className="btn btn-primary w-10 mt-4"

          //   disabled={!isValid}
        >
          {isId ? "Обновить" : "Создать"}
        </button>
        {/* </Link> */}
      </form>
    </>
  );
};
