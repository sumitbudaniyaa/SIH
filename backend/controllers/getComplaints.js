const Complaint = require('../models/complaint');


const getComplaints = async(req,res) =>{
    try{
        
        const complaints = await Complaint.find();


        return res.status(200).json({complaints});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Error in fetching complaints"});
    }
}

module.exports = {getComplaints};