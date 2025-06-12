import React from "react";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-400 text-white py-8 px-4">
      {/* Glassy overlay for a modern effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none" />
      <div className="relative max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Copyright and credit */}
        <div className="text-center md:text-left z-10">
          <p className="text-sm font-medium">
            &copy; 2024 Your E-Learning Platform. All rights reserved.
          </p>
          <p className="text-xs mt-1">
            Made with <span className="text-red-300">❤️</span>{" "}
            <a
              href=""
              className="underline hover:text-yellow-200 transition"
            >
              Vaishnavi Shinde
            </a>
          </p>
        </div>
        {/* Divider for desktop */}
        <div className="hidden md:block h-10 w-px bg-white/30 mx-6" />
        {/* Right: Social links */}
        <div className="flex items-center space-x-5 z-10">
          <a
            href=""
            className="hover:text-yellow-200 transition text-2xl"
            aria-label="Facebook"
          >
            <AiFillFacebook />
          </a>
          <a
            href=""
            className="hover:text-yellow-200 transition text-2xl"
            aria-label="Twitter"
          >
            <AiFillTwitterSquare />
          </a>
          <a
            href=""
            className="hover:text-yellow-200 transition text-2xl"
            aria-label="Instagram"
          >
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;