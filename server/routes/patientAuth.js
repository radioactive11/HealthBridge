const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const {
    signup,
    signin,
    dashboard,
    editProfile
} = require("../controllers/patientAuth");
const { body } = require("express-validator");

router.post("/signup", [
    body("name", "Please provide a valid name").not().isEmpty(),
    body("email", "Please provide a valid email address").isEmail(),
    body("phone", "Please provide a valid Phone Number").isNumeric(),
    body("age", "Please provide a valid age").isNumeric(),
    body("bloodGroup", "Please provide a valid Blood Group").not().isEmpty(),
    body("address", "Please provide a valid address").not().isEmpty(),
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

router.get("/dashboard",requireLogin,dashboard);

router.post("/update",requireLogin,editProfile);

module.exports = router;