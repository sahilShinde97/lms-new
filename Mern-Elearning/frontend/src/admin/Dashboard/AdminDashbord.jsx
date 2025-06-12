import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <Layout>
        <div className="flex flex-wrap justify-center items-center gap-8 py-12 bg-gradient-to-br from-purple-50 via-white to-yellow-50 min-h-[60vh]">
          <div className="bg-white rounded-2xl shadow-xl p-8 min-w-[220px] flex flex-col items-center border-t-4 border-purple-500 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">Total Courses</p>
            <p className="text-3xl font-extrabold text-purple-700">{stats.totalCoures}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 min-w-[220px] flex flex-col items-center border-t-4 border-pink-500 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">Total Lectures</p>
            <p className="text-3xl font-extrabold text-pink-600">{stats.totalLectures}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 min-w-[220px] flex flex-col items-center border-t-4 border-yellow-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">Total Users</p>
            <p className="text-3xl font-extrabold text-yellow-500">{stats.totalUsers}</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashbord;