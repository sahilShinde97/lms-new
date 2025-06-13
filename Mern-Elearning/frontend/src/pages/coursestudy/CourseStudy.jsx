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
        <div className="min-h-[70vh] py-16 px-4 bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-blue-200">
            {/* Left: Course Image and Details */}
            <div className="md:w-2/3 p-8 flex flex-col justify-center">
              <img
                src={course.image}
                alt={course.title}
                className="w-full max-w-lg max-h-64 object-contain rounded-2xl shadow mb-6 mx-auto border-4 border-blue-200 bg-white"
              />
              <h2 className="text-4xl font-extrabold text-blue-800 mb-2 text-center drop-shadow">{course.title}</h2>
              <div className="text-lg text-gray-700 mb-4 text-center font-medium">{course.description}</div>
              <div className="flex flex-col md:flex-row md:justify-center gap-4 mb-4">
                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold shadow">By: {course.createdBy}</span>
                <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-semibold shadow">Duration: {course.duration} weeks</span>
              </div>
            </div>
            {/* Right: Action Card */}
            <div className="md:w-1/3 bg-gradient-to-br from-blue-200 via-white to-blue-100 flex flex-col justify-center items-center p-8 border-l border-blue-100">
              <div className="w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">Start Learning</h3>
                <Link
                  to={`/lectures/${course._id}`}
                  className="w-full text-center bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300 hover:from-blue-700 hover:via-blue-500 hover:to-blue-400 text-white font-semibold py-3 px-8 rounded-xl shadow transition text-lg mb-4"
                >
                  Go to Lectures
                </Link>
                <div className="text-gray-500 text-sm text-center">Access all course lectures and materials.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;