const express = require('express');
const router = express.Router();




const {createComplaint} = require('../controllers/createComplaint');
const {getComplaints} = require('../controllers/getComplaints');


router.post('/createComplaint', createComplaint);
router.get('/getComplaints', getComplaints);

module.exports = router;