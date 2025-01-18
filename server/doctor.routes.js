import express from 'express';
import DoctorController from './doctor.controller.js';
import jwtAuth from './config/jwt.middleware.js';

const doctorRouter = express.Router();

const doctorController = new DoctorController();

doctorRouter.post('/register', (req, res, next)=>{
    doctorController.register(req, res, next);
});

doctorRouter.post('/login', (req, res, next)=>{
    doctorController.login(req, res, next);
});

doctorRouter.get('/profile', jwtAuth, (req, res, next)=>{
    doctorController.profile(req, res, next);
});

export default doctorRouter;