const express = require("express");
const router = express.Router();
const controller = require("../controllers/booking.controller");
router.post("/", controller.addBooking);
module.exports = router;