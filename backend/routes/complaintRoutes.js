const express = require('express');
const router = express.Router();




const {createComplaint} = require('../controllers/createComplaint');



router.post('/createComplaint', createComplaint);


module.exports = router;