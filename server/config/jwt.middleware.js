import jwt from 'jsonwebtoken';

// const jwtAuth = (req, res, next) => {
//     const token = req.headers['authorization'];

//     if(!token) {
//         return res.status(403).send('Access Denied');
//     }
//     try{
//         const payload = jwt.verify(token, "SDFYChgbjnebwfu");
//         req.userId = payload.doctorId;
//     } catch (err) {
//         return res.status(401).send('Invalid Token');
//     }
//     next();
// }

const jwtAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('Access Denied');
    }

    const token = authHeader.split(' ')[1]; // Extract token
    try {
        const payload = jwt.verify(token, "SDFYChgbjnebwfu");
        req.userId = payload.doctorId; // Attach doctorId to req
    } catch (err) {
        console.error("Invalid Token:", err.message);
        return res.status(401).send('Invalid Token');
    }
    next();
};


export default jwtAuth;