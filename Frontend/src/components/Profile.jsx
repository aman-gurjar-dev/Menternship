import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, serUser] = useState([]);
  const [content, setContent] = useState("");
  const handlechange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/Push",
        { content },
        {
          withCredentials: true,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/Profile")
      .then((res) => serUser(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800">Hello Harsh</h1>
        <h2 className="text-lg text-gray-600">You can create a post here</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            name="content"
            id="content"
            onChange={handlechange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your post..."
          ></textarea>
          <button
            type="submit"
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create Your Post
          </button>
        </form>
      </div>

      <div className="mt-6 w-full max-w-lg">
        {user.map((val) => {
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">@aman</h3>
            <p className="text-gray-600">Content</p>
            <div className="flex gap-2 mt-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                Like
              </button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                Edit
              </button>
            </div>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Profile;
