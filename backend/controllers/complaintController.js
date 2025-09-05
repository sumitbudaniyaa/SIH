const Complaint = require("../models/complaint");
const cloudinary = require("../config/cloudinary");

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    return res.status(200).json({ complaints });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in fetching complaints" });
  }
};

exports.trackComplaint = async (req, res) => {
  try {
    const { complaintId } = req.body;
    const complaint = await Complaint.findOne({ complaintId });

    if(!complaint) {return res.status(404).json({message: "Invalid tracking id"});
  }
    return res.status(200).json({ complaint });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching your complaint." });
  }
};

exports.createComplaint = async (req, res) => {
  try {
    const complaint = req.body;

    complaintPhone = parseInt(complaint.phone);
    complaint.phone = complaintPhone;

    const uploadPhoto = await cloudinary.uploader.upload(complaint.photo, {
      folder: "Photo",
    });

    complaint.photo = uploadPhoto.secure_url;
    complaint.photo_publicId = uploadPhoto.public_id;

    const newComplaint = await new Complaint(complaint);

    newComplaint.complaintId = `${newComplaint.phone}${newComplaint._id.toString().slice(-3)}`;

    await newComplaint.save();

    return res.status(200).json({ message: "Complaint created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error creating complaint" });
  }
};



exports.updateComplaint = async (req, res) => {
  try {
    const { complaintId, status } = req.body;

    const complaint = await Complaint.findOne({ complaintId });

    if (complaint) {
      complaint.status = status || complaint.status;
      await complaint.save();
      res.status(200).json({ message: "Complaint Status Updated." });
    } else {
      res.status(400).json({ message: "Complaint Not Found." });
    }
  } catch (err) {
    console.err(err);
    return res.status(500).json({ message: "Error fetching your complaint." });
  }
};
