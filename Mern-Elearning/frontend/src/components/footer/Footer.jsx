import React from "react";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-400 text-white py-8 px-4">
      {/* Glassy overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none" />

      <div className="relative max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 z-10">
        {/* Left: Text */}
        <div className="text-center md:text-left">
          <p className="text-sm sm:text-base font-medium">
            &copy; 2024 Your E-Learning Platform. All rights reserved.
          </p>
          <p className="text-xs mt-1">
            Made with <span className="text-red-300">❤️</span>{" "}
            <a
              href="https://github.com/sahilshinde"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yellow-200 transition"
            >
              Vaishnavi Shinde
            </a>
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-10 w-px bg-white/30" />

        {/* Right: Icons */}
        <div className="flex items-center space-x-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-200 hover:scale-110 transition text-2xl"
            aria-label="Facebook"
          >
            <AiFillFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-200 hover:scale-110 transition text-2xl"
            aria-label="Twitter"
          >
            <AiFillTwitterSquare />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-200 hover:scale-110 transition text-2xl"
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
