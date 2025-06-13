import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const categories = [
  "Email Marketing",
  "Social Media Marketing",
  "Sales Marketing",
  "SEO Marketing",
  "Content Marketing",
  "Web Development",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [showMobileForm, setShowMobileForm] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { courses, fetchCourses } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("image", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[60vh] py-12 bg-gradient-to-br from-purple-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Add Course Button (top, all screens) */}
          <div className="flex justify-end mb-6">
            <button
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white font-bold py-2 px-6 rounded-xl shadow transition text-lg"
              onClick={() => setShowMobileForm(true)}
            >
              Add Course
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-12">
            {/* Left: All Courses */}
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-purple-700 mb-8 text-center md:text-left drop-shadow-lg">All Courses</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {courses && courses.length > 0 ? (
                  courses.map((e) => (
                    <div className="backdrop-blur-md bg-white/70 border border-purple-100 rounded-2xl shadow-2xl hover:scale-[1.03] transition-transform duration-200" key={e._id}>
                      <CourseCard course={e} />
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500 text-lg">
                    No Courses Yet
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Modal Form (all screens) */}
          {showMobileForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-[95vw] max-w-xs md:max-w-md relative max-h-[90vh] overflow-y-auto">
                <button
                  className="absolute top-2 right-2 text-xl text-gray-500 hover:text-purple-700"
                  onClick={() => setShowMobileForm(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-xl font-extrabold text-purple-700 mb-4 text-center">Add Course</h2>
                <form onSubmit={submitHandler} className="space-y-3">
                  <div>
                    <label htmlFor="title" className="block font-semibold mb-1">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block font-semibold mb-1">Description</label>
                    <ReactQuill
                      value={description}
                      onChange={setDescription}
                      theme="snow"
                      className="bg-white rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block font-semibold mb-1">Price</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="createdBy" className="block font-semibold mb-1">Created By</label>
                    <input
                      type="text"
                      value={createdBy}
                      onChange={(e) => setCreatedBy(e.target.value)}
                      required
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block font-semibold mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value={""}>Select Category</option>
                      {categories.map((e) => (
                        <option value={e} key={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="duration" className="block font-semibold mb-1">Duration</label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="image" className="block font-semibold mb-1">Image</label>
                    <input
                      type="file"
                      required
                      onChange={changeImageHandler}
                      className="w-full"
                    />
                    {imagePrev && (
                      <img
                        src={imagePrev}
                        alt=""
                        width={200}
                        className="mt-2 rounded-xl shadow"
                      />
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={btnLoading}
                    className="common-btn w-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white font-semibold py-2 rounded-xl shadow transition text-lg"
                  >
                    {btnLoading ? "Please Wait..." : "Add"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;