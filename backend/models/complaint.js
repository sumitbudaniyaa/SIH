const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  complaintId: {
    type: String,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  photo_publicId: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Road", "Sewage"],
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
  status: {
    type: String,
    enum: ["Pending", "Progress", "Solved"],
    default: "Pending",
  },
});

complaintSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Complaint", complaintSchema);

