import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../assets/logo.png"; // Change to .svg if using SVG

const Header = ({ isAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Image */}
        <Link to="/" className="flex items-center group">
          <div className="relative p-1 rounded-full overflow-visible animate-float">
            {/* Very Light Gradient Circle */}
            <div className="absolute inset-0 rounded-full z-0 bg-gradient-to-tr from-blue-100 via-purple-100 to-yellow-100 opacity-40 blur-md"></div>
            {/* Glowing Effect */}
            <div className="absolute inset-0 rounded-full z-0 bg-blue-200 opacity-30 blur-xl animate-pulse"></div>
            <img src={logo} alt="VS Logo" className="relative z-10 h-16 w-auto object-contain select-none drop-shadow-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-lg font-semibold">
          <Link to="/" className="hover:text-purple-700 transition">Home</Link>
          <Link to="/courses" className="hover:text-purple-700 transition">Courses</Link>
          <Link to="/about" className="hover:text-purple-700 transition">About</Link>
          {isAuth ? (
            <Link to="/account" className="hover:text-purple-700 transition">Account</Link>
          ) : (
            <Link to="/login" className="hover:text-purple-700 transition">Login</Link>
          )}
        </nav>

        {/* Mobile Toggle Button */}
        <div className="md:hidden text-3xl text-purple-700" onClick={toggleMenu}>
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-inner px-4 pb-4">
          <Link to="/" onClick={toggleMenu} className="block py-2 text-gray-800 hover:text-purple-700">Home</Link>
          <Link to="/courses" onClick={toggleMenu} className="block py-2 text-gray-800 hover:text-purple-700">Courses</Link>
          <Link to="/about" onClick={toggleMenu} className="block py-2 text-gray-800 hover:text-purple-700">About</Link>
          {isAuth ? (
            <Link to="/account" onClick={toggleMenu} className="block py-2 text-gray-800 hover:text-purple-700">Account</Link>
          ) : (
            <Link to="/login" onClick={toggleMenu} className="block py-2 text-gray-800 hover:text-purple-700">Login</Link>
          )}
        </div>
      )}

      {/* Decorative gradient bar for extra flair */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-700 via-purple-500 to-yellow-400" />
    </header>
  );
};

export default Header;