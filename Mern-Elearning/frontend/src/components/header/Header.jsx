import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Header = ({ isAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Larger, gradient, shadowed logo */}
        <div className="text-4xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-700 via-purple-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg select-none tracking-wide">
          V-Shinde
        </div>

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