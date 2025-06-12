import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [completedLec, setCompletedLec] = useState(0);
  const [lectLength, setLectLength] = useState(0);
  const [progress, setProgress] = useState({ completedLectures: [] });

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  const fetchLectures = useCallback(async () => {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching lectures:", error);
      setLoading(false);
    }
  }, [params.id]);

  const fetchLecture = useCallback(async (id) => {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.error("Error fetching lecture:", error);
      setLecLoading(false);
    }
  }, []);

  const fetchProgress = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  }, [params.id]);

  const addProgress = useCallback(
    async (id) => {
      try {
        const { data } = await axios.post(
          `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        await fetchProgress();
      } catch (error) {
        console.error("Error adding progress:", error);
      }
    },
    [params.id, fetchProgress]
  );

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, [fetchLectures, fetchProgress]);

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("video", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            toast.loading(`Uploading: ${percentCompleted}%`, { id: "upload" });
          },
          timeout: 300000,
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      toast.dismiss("upload");
      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.dismiss("upload");
      if (error.code === "ECONNABORTED") {
        toast.error(
          "Upload timed out. Please try again with a smaller file or better internet connection."
        );
      } else {
        toast.error(
          error.response?.data?.message || "Something went wrong. Please try again."
        );
      }
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Progress Bar */}
          <div className="w-full max-w-2xl mx-auto my-6 bg-white rounded-xl shadow-md p-6 text-center">
            <h2 className="text-lg font-semibold text-purple-700 mb-2">
              Progress: {completedLec} / {lectLength} Lectures Completed
            </h2>
            <progress
              value={completed}
              max={100}
              className="w-full h-3 rounded bg-gray-300 accent-purple-600"
            ></progress>
            <p className="text-sm text-gray-500 mt-1">{completed}% Complete</p>
          </div>

          <div className="lecture-page flex flex-col md:flex-row gap-8 max-w-6xl mx-auto p-4">
            {/* Left: Video Display */}
            <div className="left flex-1 bg-white rounded-2xl shadow-md p-6">
              {lecLoading ? (
                <Loading />
              ) : lecture?.video ? (
                <>
                  <video
                    src={lecture.video}
                    controls
                    disablePictureInPicture
                    disableRemotePlayback
                    controlsList="nodownload noremoteplayback"
                    autoPlay
                    onEnded={() => addProgress(lecture._id)}
                    className="rounded-xl w-full mb-4 shadow-lg"
                  ></video>
                  <h1 className="text-2xl font-bold text-purple-800 mb-2">{lecture.title}</h1>
                  <p className="text-md text-gray-700">{lecture.description}</p>
                </>
              ) : (
                <p className="text-gray-500 text-lg text-center">Please Select a Lecture</p>
              )}
            </div>

            {/* Right: Admin Form + Lecture List */}
            <div className="right flex-1 space-y-4">
              {user?.role === "admin" && (
                <button
                  className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Close Form" : "Add Lecture +"}
                </button>
              )}

              {show && (
                <div className="bg-white shadow-md rounded-xl p-6">
                  <h2 className="text-xl font-bold text-purple-700 mb-4">Add New Lecture</h2>
                  <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                      <label className="font-medium">Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                      />
                    </div>
                    <div>
                      <label className="font-medium">Description</label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                      />
                    </div>
                    <div>
                      <input
                        type="file"
                        onChange={changeVideoHandler}
                        required
                        className="w-full text-sm text-gray-600"
                      />
                    </div>
                    {videoPrev && (
                      <video
                        src={videoPrev}
                        controls
                        className="rounded-md w-full mt-2 shadow"
                      ></video>
                    )}
                    <button
                      type="submit"
                      disabled={btnLoading}
                      className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      {btnLoading ? "Uploading..." : "Add Lecture"}
                    </button>
                  </form>
                </div>
              )}

              <div className="space-y-3">
                {lectures.length > 0 ? (
                  lectures.map((e, i) => (
                    <div key={e._id} className="bg-white rounded-lg shadow px-4 py-3">
                      <div
                        onClick={() => fetchLecture(e._id)}
                        className={`flex items-center justify-between cursor-pointer transition ${
                          lecture?._id === e._id
                            ? "text-purple-700 font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        <span>
                          {i + 1}. {e.title}
                        </span>
                        {progress.completedLectures?.includes(e._id) && (
                          <span className="bg-green-500 p-1 rounded-full text-white">
                            <TiTick />
                          </span>
                        )}
                      </div>
                      {user?.role === "admin" && (
                        <button
                          className="mt-2 w-full py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          onClick={() => deleteHandler(e._id)}
                        >
                          Delete Lecture
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No lectures uploaded yet.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lecture;
