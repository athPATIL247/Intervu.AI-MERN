import express from "express";
import { logout, signin, signup, verifyToken } from "../controllers/auth.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/logout').get(logout);
router.route('/verify').get(isAuthenticated, verifyToken);

export default router;
