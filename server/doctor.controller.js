import jwt from 'jsonwebtoken';
import DoctorRepository from './doctor.repository.js';
import bcrypt from 'bcrypt';
import { DoctorModel } from './doctor.schema.js';

export default class DoctorController {

    constructor(){
        this.doctorRepository = new DoctorRepository();
    }

    async register(req, res, next){
        console.log("Registering doctor");
        const {name, password} = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            const doctor = new DoctorModel({name, password: hashedPassword});
            await this.doctorRepository.register(doctor);
            res.status(201).json(doctor);
        } catch (error) {
            console.log("Error registering doctor", error);
        }
    }

    async login(req, res, next){
        try {
            const doctor = await this.doctorRepository.findByEmail(req.body.name);
            if(!doctor){
                return res.status(404).send("Doctor not found");
            }else{
                const isPasswordValid = await bcrypt.compare(req.body.password, doctor.password);
                if(isPasswordValid){
                    const token = jwt.sign(
                        {
                            doctorId: doctor._id
                        },
                        "SDFYChgbjnebwfu",
                        {
                            expiresIn: "1h"
                        }
                    );
                    console.log("login success")
                    return res.status(200).send({token});
                }else{
                    return res.status(401).send("Invalid credentials");
                }
            }

        } catch (error) {
            console.log("invalid credentials", error);
        }
    }

    async profile(req, res, next) {
        try {
            console.log("Received User ID:", req.userId); // Debug log
            const doctor = await DoctorModel.findById(req.userId);
            if (!doctor) {
                return res.status(404).send("Doctor not found");
            } else {
                return res.status(200).json(doctor);
            }
        } catch (error) {
            console.log("Error fetching doctor profile:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}