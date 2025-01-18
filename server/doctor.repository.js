import mongoose from "mongoose";
import { DoctorModel } from "./doctor.schema.js";

export default class DoctorRepository {

    async register(user){
        try {
            const existingDoctor = await DoctorModel.findOne({ name: user.name });
            if(existingDoctor){
                throw new Error("Doctor with this name already exists");
            }
            const newDoctor = new DoctorModel(user);
            await newDoctor.save();
            return newDoctor;
            console.log("Doctor registered successfully");
        } catch (error) {
            console.log("Error registering doctor", error);
        }
    }

    async login(name, password){
        try{
           return await DoctorModel.findOne({name, password});
        }
        catch(err){
            console.log(err);
        }
    }

    async findByEmail(name) {
        try{
            return await DoctorModel.findOne({name});
        }catch(err){
            console.log(err);
        }
    }
}