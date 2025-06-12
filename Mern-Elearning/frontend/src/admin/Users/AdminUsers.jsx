import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.mainrole !== "superadmin") return navigate("/");

  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id) => {
    if (confirm("Are you sure you want to update this user's role?")) {
      try {
        const { data } = await axios.put(
          `${server}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Error updating role");
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-[60vh] py-12 bg-gradient-to-br from-purple-50 via-white to-yellow-50">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-purple-700 mb-8 text-center">All Users</h1>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-hidden rounded-2xl shadow-xl bg-white border border-purple-100">
            <table className="min-w-full divide-y divide-purple-100">
              <thead className="bg-gradient-to-r from-purple-100 via-pink-50 to-yellow-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">Update Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {users.length > 0 ? (
                  users.map((e, i) => (
                    <tr key={e._id} className="hover:bg-purple-50 transition">
                      <td className="px-4 py-3 font-semibold">{i + 1}</td>
                      <td className="px-4 py-3">{e.name}</td>
                      <td className="px-4 py-3">{e.email}</td>
                      <td className="px-4 py-3 capitalize">{e.role}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => updateRole(e._id)}
                          className="common-btn bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white font-semibold py-1 px-4 rounded-xl shadow transition text-sm"
                        >
                          Update Role
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile View: Cards */}
          <div className="md:hidden space-y-4">
            {users.length > 0 ? (
              users.map((e, i) => (
                <div key={e._id} className="bg-white rounded-xl shadow-md p-4 border border-purple-100">
                  <div className="mb-1 text-sm text-purple-500 font-semibold">#{i + 1}</div>
                  <div className="text-lg font-bold text-purple-700">{e.name}</div>
                  <div className="text-sm text-gray-600 mb-1">{e.email}</div>
                  <div className="text-sm mb-2">
                    <span className="font-medium text-purple-600">Role:</span> {e.role}
                  </div>
                  <button
                    onClick={() => updateRole(e._id)}
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 text-white font-semibold py-2 rounded-xl shadow text-sm transition"
                  >
                    Update Role
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No users found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;
