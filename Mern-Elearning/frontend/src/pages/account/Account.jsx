import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-yellow-50 py-12">
      {user && (
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-purple-100 flex flex-col items-center">
          <h2 className="text-2xl font-extrabold text-purple-700 mb-6">My Profile</h2>
          <div className="profile-info w-full flex flex-col items-center">
            <p className="mb-2 text-lg font-semibold text-gray-800">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="mb-6 text-lg font-semibold text-gray-800">
              <strong>Email:</strong> {user.email}
            </p>
            <button
              onClick={() => navigate(`/${user._id}/dashboard`)}
              className="common-btn w-full flex items-center justify-center gap-2 mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white font-semibold py-2 rounded-xl shadow transition text-lg"
            >
              <MdDashboard />
              Dashboard
            </button>
            {user.role === "admin" && (
              <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="common-btn w-full flex items-center justify-center gap-2 mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white font-semibold py-2 rounded-xl shadow transition text-lg"
              >
                <MdDashboard />
                Admin Dashboard
              </button>
            )}
            <button
              onClick={logoutHandler}
              className="common-btn w-full flex items-center justify-center gap-2 mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-xl shadow transition text-lg"
            >
              <IoMdLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;