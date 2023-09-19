import { ADMIN, USER } from "../constants/index.js";

const ROLES = {
	User: USER,
	Admin: ADMIN,
};

const checkRole = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req?.user && !req?.roles) {
			res.status(401);
			throw new Error("Not authorized");
		}
		//create roles array from allowed roles
		const rolesArray = [...allowedRoles];
		//map over req.roles,if it includes the roles we passed in return true otherwise return false.includes() method return boolean
		const roleFound = req.roles
			.map((role) => rolesArray.includes(role))
			.find((value) => value === true);

		if (!roleFound) {
			res.status(401);
			throw new Error("Not authorized");
		}

		next();
	};
};

const role = { ROLES, checkRole };
export default role;
