import React from "react";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Dashbord = () => {
  const { mycourse } = CourseData();
  return (
    <div className="min-h-[60vh] py-12 bg-gradient-to-br from-purple-50 via-white to-yellow-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-10 drop-shadow">
          All Enrolled Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mycourse && mycourse.length > 0 ? (
            mycourse.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No course Enrolled Yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashbord;