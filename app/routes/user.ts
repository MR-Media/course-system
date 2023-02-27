const router = require("express").Router();

const userController = require("../controllers/userController");

const isAuthorized = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getMyUser", isAuthorized, userController.get_my_user);
router.get("/getUserById", isAuthorized, userController.get_user_by_id);

module.exports = router;
