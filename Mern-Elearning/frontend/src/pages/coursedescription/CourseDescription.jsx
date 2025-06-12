import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();

  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );

    const options = {
      key: "rzp_test_LkTEA9sGyZuDki",
      amount: order.amount,
      currency: "INR",
      name: "E learning",
      description: "Learn with us",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };
    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="min-h-[60vh] flex items-center justify-center py-16 bg-gradient-to-br from-purple-50 via-white to-yellow-50">
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center border border-purple-100 max-w-3xl w-full gap-8">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-72 h-44 object-cover rounded-xl shadow mb-6 md:mb-0"
                />
                <div className="flex-1 flex flex-col items-center md:items-start">
                  <h2 className="text-3xl font-extrabold text-purple-700 mb-2 text-center md:text-left">{course.title}</h2>
                  <p className="text-base text-gray-700 mb-1">Instructor: <span className="font-semibold">{course.createdBy}</span></p>
                  <p className="text-base text-gray-700 mb-1">Duration: {course.duration} weeks</p>
                  <p className="text-base text-gray-700 mb-4">{course.description}</p>
                  <p className="text-lg font-bold text-gray-800 mb-6">
                    Let's get started with course At <span className="text-purple-700">₹{course.price}</span>
                  </p>
                  {user && user.subscription.includes(course._id) ? (
                    <button
                      onClick={() => navigate(`/course/study/${course._id}`)}
                      className="common-btn bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white font-semibold py-2 px-8 rounded-xl shadow transition text-lg w-full"
                    >
                      Study
                    </button>
                  ) : (
                    <button
                      onClick={checkoutHandler}
                      className="common-btn bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white font-semibold py-2 px-8 rounded-xl shadow transition text-lg w-full"
                    >
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;