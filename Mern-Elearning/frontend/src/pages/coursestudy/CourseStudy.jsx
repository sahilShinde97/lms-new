import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();

  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  return (
    <>
      {course && (
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 bg-gradient-to-br from-purple-50 via-white to-yellow-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-purple-100 max-w-lg w-full">
            <img
              src={course.image}
              alt={course.title}
              className="w-72 h-44 object-cover rounded-xl shadow mb-6"
            />
            <h2 className="text-3xl font-extrabold text-purple-700 mb-2 text-center">{course.title}</h2>
            <h4 className="text-lg text-gray-700 mb-2 text-center">{course.description}</h4>
            <h5 className="text-base text-gray-500 mb-1">by - {course.createdBy}</h5>
            <h5 className="text-base text-gray-500 mb-6">Duration - {course.duration} weeks</h5>
            <Link
              to={`/lectures/${course._id}`}
              className="common-btn bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white font-semibold py-2 px-8 rounded-xl shadow transition text-lg"
            >
              Lectures
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;