import React from "react";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = ({ user }) => {
  const params = useParams();
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-yellow-50">
      {user && (
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-purple-100 max-w-md w-full">
          <h2 className="text-3xl font-extrabold text-green-600 mb-2 drop-shadow">Payment successful</h2>
          <p className="text-gray-700 mb-1">Your course subscription has been activated</p>
          <p className="text-sm text-gray-500 mb-6">Reference no - <span className="font-semibold">{params.id}</span></p>
          <Link
            to={`/${user._id}/dashboard`}
            className="common-btn w-full max-w-xs bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white font-semibold py-2 rounded-xl shadow transition text-center"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;