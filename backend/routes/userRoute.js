const {
  signUp,
  verifyAccount,
  forgetpassword,
  resetPassword,
  signin,
} = require("../controller/userController");
const {
  userRegisterRules,
  validationMethod,
} = require("../middleware/validationScript");

const router = require("express").Router();

router.post("/register", userRegisterRules, validationMethod, signUp);
router.get("/verify/:token", verifyAccount);

router.post("/forgetpassword", forgetpassword);
router.post("/resetpassword/:token", resetPassword);

router.post("/login", signin);

module.exports = router;
