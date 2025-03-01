import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { authenticateUser, authorizePermissions,checkForTestUser } from "../middleware/authMiddleware.js";
import {validateUpdateUser } from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router=Router();


router.get('/current-user',getCurrentUser)
router.get('/admin/app-stats',authorizePermissions('admin'),getApplicationStats)
router.patch('/update-user',upload.single('avatar'),checkForTestUser,validateUpdateUser,updateUser)

export default router;