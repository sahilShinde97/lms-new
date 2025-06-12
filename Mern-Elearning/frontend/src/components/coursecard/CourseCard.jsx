import React from "react";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300 p-5 w-full max-w-xs sm:max-w-sm mx-auto group overflow-hidden">
      {/* Decorative gradient bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 via-pink-400 to-yellow-400" />
      {/* Floating price badge */}
      <div className="absolute top-5 right-5 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
        ₹{course.price}
      </div>
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-44 object-cover rounded-2xl mt-4 shadow group-hover:scale-105 transition-transform duration-300"
      />
      <h3 className="text-xl font-extrabold mt-4 text-purple-700 truncate">{course.title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        Instructor: <span className="font-medium">{course.createdBy}</span>
      </p>
      <p className="text-sm text-gray-600">Duration: {course.duration} weeks</p>

      <div className="mt-5">
        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white py-2 px-4 rounded-xl font-semibold shadow transition"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white py-2 px-4 rounded-xl font-semibold shadow transition"
                >
                  Get Started
                </button>
              )
            ) : (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white py-2 px-4 rounded-xl font-semibold shadow transition"
              >
                Study
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white py-2 px-4 rounded-xl font-semibold shadow transition"
          >
            Get Started
          </button>
        )}
      </div>

      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl font-semibold shadow transition"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CourseCard;