const express = require("express");
const router = express.Router();
const {
    signup,
    getAllDonors
} = require("../controllers/donor");
const { body } = require("express-validator");

router.post("/signup", [
    body("name", "Please provide a valid name").not().isEmpty(),
    body("phone", "Please provide a valid Phone Number").isNumeric(),
    body("age", "Please provide a valid age").isNumeric(),
    body("bloodGroup", "Please provide a valid Blood Group").not().isEmpty(),
    body("address", "Please provide a valid address").not().isEmpty()
  ],signup);

router.get("/",getAllDonors);

module.exports = router;