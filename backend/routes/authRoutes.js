import express from "express";
import registerUser from "../controllers/auth/registerController.js";
import verfifyUserEmail from "../controllers/auth/verifyEmailController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:emailToken/:userId", verfifyUserEmail);

export default router;
