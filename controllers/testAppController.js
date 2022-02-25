import User from '../models/testAppModel.js'
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import {SECRET_KEY, JWT_TOKEN_LIFE_TIME} from '../config/config.js'


const generateAccessToken = (id) => {
    const payload = {
        id,
    }
    return jwt.sign(payload, SECRET_KEY, {expiresIn: JWT_TOKEN_LIFE_TIME})
}


class TestAppController {
    
    // registration new user
    async registrationUser (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Registration error', errors})
            }
            const { email, password } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({message: 'An account with this email already exists'})
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = await User.create({
            email: email,
            password: hashedPassword,
            });
            res.json(user);
            } catch (err) {
                res.status(400).json({message: 'Registration error'})
            }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: `${email} not found` })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: 'wrong password' })
            }
            
            const token = generateAccessToken(user._id);
            return res.json({ token })
            
        } catch (err) {
            res.status(400).json({message: 'Login error'})
        }
    }

    //find all users
    async getAll (req, res) {
        try {
            const users = await User.find();
            return res.json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    }


    // find user by id
    async getUser (req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(400).json({message: 'no id'})
            }
            const user = await User.findById(id);
            return res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    //delete user
    async deleteUser (req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: `${email} not found` })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: 'wrong password' })
            }
            await User.deleteOne({email})
            return res.json({message: `user ${email} has been deleted`})
        } catch (err) {
            res.status(400).json(err)
        }
    }


    // update user
  async updateUser (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: `${email} not found` })
            }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newPassword = { password: hashedPassword };
        await User.updateOne({ email }, newPassword);
        return res.json({message: `user ${email} has been updated`})
        } catch (err) {
            res.status(400).json('error')
        }
  }
}

export default new TestAppController();

