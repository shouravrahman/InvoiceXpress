import express from "express";
import getUserProfile from "../controllers/user/getUserProfile.js";
import checkAuth from "../middlewares/checkAuthMiddleware.js";
import updateUserProfile from "../controllers/user/updateUserProfile.js";
import deleteAccount from "../controllers/user/deleteAccount.js";
import getAllUserAccounts from "../controllers/user/admin/getAllUserAccounts.js";
import deleteUserAccount from "../controllers/user/admin/deleteUserAccount.js";
import deactivateUserAccount from "../controllers/user/admin/deactivateUser.js";
import role from "../middlewares/roleMiddleware.js";
const router = express.Router();

router
	.route("/profile")
	.get(checkAuth, getUserProfile)
	.patch(checkAuth, updateUserProfile)
	.delete(checkAuth, deleteAccount);

router
	.route("/all")
	.get(checkAuth, role.checkRole(role.ROLES.Admin), getAllUserAccounts);

router
	.route("/:id")
	.delete(checkAuth, role.checkRole(role.ROLES.Admin), deleteUserAccount);

router
	.route("/:id/deactivate")
	.post(checkAuth, role.checkRole(role.ROLES.Admin), deactivateUserAccount);

export default router;
