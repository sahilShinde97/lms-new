import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function onChange(value) {
    setShow(true);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-yellow-50 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-purple-100">
        <h2 className="text-2xl font-extrabold text-purple-700 mb-6 text-center">Verify Account</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block font-semibold mb-1">Otp</label>
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChange}
            className="mx-auto"
          />
          {show && (
            <button
              disabled={btnLoading}
              type="submit"
              className="common-btn w-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white font-semibold py-2 rounded-xl shadow transition text-lg"
            >
              {btnLoading ? "Please Wait..." : "Verify"}
            </button>
          )}
        </form>
        <p className="mt-6 text-center text-gray-600">
          Go to <Link to="/login" className="text-purple-600 hover:underline">Login</Link> page
        </p>
      </div>
    </div>
  );
};

export default Verify;