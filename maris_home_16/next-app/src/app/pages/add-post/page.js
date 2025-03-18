"use client";
import { useState } from "react";

export default function AddPost() {
  const [formdata, setFormData] = useState({
    title: "",
    description: "",
    img: "",
  });

  const onChangeHandler = (e) =>
    setFormData({ ...formdata, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });

    if (!res.ok) {
      return;
    }

    const data = await res.json();
    console.log(data);

    alert("Post created successfully!");

    setFormData({
      title: "",
      description: "",
      img: "",
    });

    // Clear the form after successful submission
    setFormData({
      title: "",
      description: "",
      img: "",
    });
  };

  return (
    <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
      <div className="container max-w-3xl mx-auto p-4">
        <h1 className="text-5xl font-bold my-10">Add Post</h1>

        <form onSubmit={onSubmitHandler} className="bg-white p-6 rounded-lg shadow-xl">
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Post Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Post title"
              className="input input-bordered w-full"
              onChange={onChangeHandler}
              value={formdata.title}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="input input-bordered w-full"
              onChange={onChangeHandler}
              value={formdata.description}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              name="img"
              placeholder="Image URL"
              className="input input-bordered w-full"
              onChange={onChangeHandler}
              value={formdata.img}
            />
          </div>
          <div className="form-control">
            <button
              type="submit"
              className="btn mt-3 btn-success text-white hover:bg-green-500 transition-colors min-w-40"
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
