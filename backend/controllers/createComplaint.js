const Complaint = require("../models/complaint");
const cloudinary = require("../config/cloudinary");

const createComplaint = async (req, res) => {
  try {
    const complaint= req.body;

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


module.exports = {createComplaint};