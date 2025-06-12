import React from "react";
import { useNavigate } from "react-router-dom";
import Testimonials from "../../components/testimonials/Testimonials";
import profileImage from '../../assets/vaishnavi.jpg';
import {
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-purple-100 via-white to-yellow-50 py-24 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4 drop-shadow">
            Digital World with Vaishnavi
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Simplifying the digital world for every learner.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="common-btn bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white font-semibold py-3 px-8 rounded-xl shadow transition text-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16">
          {/* Text Content */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-4xl font-extrabold text-purple-700 mb-2">
              Vaishnavi Shinde
            </h2>
            <p className="mt-2 text-lg text-gray-600 font-medium">
              Founder | Speaker | Digital Educator
            </p>
            <p className="italic text-base text-gray-500 mt-2">Let’s learn!</p>
            <div className="flex justify-center md:justify-start mt-6 space-x-6 text-2xl text-purple-600">
              <a href="#" className="hover:text-pink-500 transition">
                <AiFillTwitterCircle />
              </a>
              <a href="#" className="hover:text-pink-500 transition">
                <FaLinkedin />
              </a>
              <a href="#" className="hover:text-pink-500 transition">
                <AiFillYoutube />
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="shadow-2xl rounded-full overflow-hidden border-4 border-purple-200 flex-1 flex justify-center">
            <img
              src={profileImage}
              alt="Vaishnavi Shinde"
              className="w-72 h-72 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Home;