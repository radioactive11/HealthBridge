const express = require("express");
const router = express.Router();
const requireDoctorLogin = require("../middleware/requireDoctorLogin");
const {
    signup,
    signin,
    dashboard,
    getAllDoctors
} = require("../controllers/doctorAuth");
const { body } = require("express-validator");

router.post("/signup", [
    body("name", "Please provide a valid name").not().isEmpty(),
    body("email", "Please provide a valid email address").isEmail(),
    body("department", "Please provide a valid department").not().isEmpty(),
    body(
      "password",
      "Please provide a password altleast 6 characters long"
    ).isLength({ min: 6 }),
  ],signup);


router.post(
    "/signin",
    [
      body("email", "Please provide a valid email address").isEmail(),
      body("password", "Please provide a password").not().isEmpty(),
    ],
    signin
  );

router.get("/dashboard",requireDoctorLogin,dashboard);

routes.get("/",getAllDoctors);
module.exports = router;