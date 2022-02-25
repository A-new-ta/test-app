import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../config/config.js'


export default function checkToken(req, res, next) {
    try {
        let token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Failed to authenticate token' })
        }
        const decodedData = jwt.verify(token, SECRET_KEY)
        req.user = decodedData;
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' })
    }
}


