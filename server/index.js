import express from 'express';
import mongoose from 'mongoose';
import { connectMongoose } from './config/mongooseConfig.js';
import doctorRouter from './doctor.routes.js';
import cors from 'cors';

const server = express();
server.use(cors());

server.use(express.json());

server.use('/doctor', doctorRouter);

server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
    connectMongoose();
});