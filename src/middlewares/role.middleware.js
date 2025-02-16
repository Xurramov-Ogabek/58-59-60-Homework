// export const roleGuard = (...roles) => {
// 	// ["admin", "superadmin"]
// 	return async (req, res, next) => {
// 		try {
// 			const userRoles = req.user.role; // "user"

// 			if (!roles.includes(userRoles)) {
// 				return res.send("Your roles are not allowed to access this route");
// 			}
// 			next();
// 		} catch (error) {
// 			res.send(error);
// 		}
// 	};
// };

// // Middleware == roleGuard("admin", "superadmin");

export const roleGuard = (...roles) => {
	return async (req, res, next) => {
		try {
			// 1️⃣ Foydalanuvchi ma'lumotlarini tekshirish
			if (!req.user) {
				return res.status(401).json({ message: "Unauthorized: No user data found" });
			}

			const userRoles = Array.isArray(req.user.role) ? req.user.role : [req.user.role];

			// 2️⃣ Ruxsat tekshirish
			const hasRole = userRoles.some(role => roles.includes(role));

			if (!hasRole) {
				return res.status(403).json({ message: "Forbidden: Access denied" });
			}

			// 3️⃣ Keyingi middleware'ga o'tish
			next();
		} catch (error) {
			console.error("RoleGuard Error:", error);
			res.status(500).json({ message: "Internal Server Error", error: error.message });
		}
	};
};