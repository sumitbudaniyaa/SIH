const express = require("express");
const router = express.Router();

const complaintController = require("../controllers/complaintController.js");

router.post("/createComplaint", complaintController.createComplaint);
router.get("/getComplaints", complaintController.getComplaints);
router.post("/trackComplaint", complaintController.trackComplaint);
router.post("/updateComplaint", complaintController.updateComplaint);

module.exports = router;

