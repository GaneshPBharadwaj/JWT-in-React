import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
  }, {
    timestamps: true
});

export const DoctorModel = mongoose.model('Doctor', doctorSchema);