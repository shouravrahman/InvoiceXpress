import express from "express";
import registerUser from "../controllers/auth/registerController.js";
import verfifyUserEmail from "../controllers/auth/verifyEmailController.js";
import loginUser from "../controllers/auth/loginController.js";
import { loginLimiter } from "../middlewares/apiLimiter.js";
import newAccessToken from "../controllers/auth/refreshTokenController.js";
import resendEmailVerificationToken from "../controllers/auth/resendVerifyEmailController.js";
import {
	resetPassowrd,
	resetPasswordRequest,
} from "../controllers/auth/passwordResetController.js";
import logOutUser from "../controllers/auth/logoutController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:emailToken/:userId", verfifyUserEmail);
router.post("/login", loginLimiter, loginUser);
router.get("/new_access_token", newAccessToken);
router.post("/resend_email_token", resendEmailVerificationToken);
router.post("/reset_password", resetPassowrd);
router.post("/reset_password_request", resetPasswordRequest);
router.get("/logout", logOutUser);
export default router;
