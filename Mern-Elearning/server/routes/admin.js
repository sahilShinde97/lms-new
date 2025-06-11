import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import {
  addLectures,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllStats,
  getAllUser,
  updateRole,
} from "../controllers/admin.js";
import uploadFiles from '../middlewares/multer.js';
import uploadToCloudinary from '../middlewares/cloudinaryUpload.js';

const router = express.Router();

router.post('/course/new', uploadFiles.fields([{ name: 'image', maxCount: 1 }]), uploadToCloudinary, createCourse);
router.post('/course/:id', uploadFiles.fields([{ name: 'video', maxCount: 1 }]), uploadToCloudinary, addLectures);
router.delete("/course/:id", isAuth, isAdmin, deleteCourse);
router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);
router.get("/stats", isAuth, isAdmin, getAllStats);
router.put("/user/:id", isAuth, updateRole);
router.get("/users", isAuth, isAdmin, getAllUser);

export default router;
