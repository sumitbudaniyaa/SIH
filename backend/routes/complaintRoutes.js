const express = require("express");
const router = express.Router();

const complaintController = require("../controllers/complaintController.js");

router.post("/createComplaint", complaintController.createComplaint);
router.get("/getComplaints", complaintController.getComplaints);

module.exports = router;

