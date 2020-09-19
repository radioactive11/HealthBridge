const express = require("express");
const router = express.Router();
const requireDoctorLogin = require("../middleware/requireDoctorLogin");
const requireLogin = require("../middleware/requireLogin");

const {
    getBrandNames,
    givePrescription,
    getPrescription,
    getPrescribedMedicine
} = require("../controllers/prescription");

// router.post("/",requireLogin,getBrandNames);
router.post("/give",requireDoctorLogin,givePrescription);
router.get("/get",requireLogin,getPrescription);
// router.get("/getmedicine",requireLogin,getPrescribedMedicine);

module.exports = router;