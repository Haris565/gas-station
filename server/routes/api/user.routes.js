const router = require("express").Router();
const auth = require("../../middleware/auth");
const userController = require("../../Controller/user.controller");

router.post("/login", function (req, res) {
  userController.loginUser(req, res);
});

router.post("/register", function (req, res) {
  userController.signupUser(req, res);
});

router.post("/updateProfile", auth, function (req, res) {
  userController.updateProfile(req, res);
});

router.post("/confirm", function (req, res) {
  userController.confirmOtp(req, res);
});

router.post("/forgotPassword", function (req, res) {
  userController.forgotPassword(req, res);
});

module.exports = router;
