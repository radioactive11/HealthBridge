const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const requireDoctorLogin = require("../middleware/requireDoctorLogin");

const {
    bookAppointment,
    upcomingAppointments
} = require("../controllers/appointment");

router.post("/book",requireLogin,bookAppointment);
router.get("/upcoming",requireDoctorLogin,upcomingAppointments);

module.exports = router;