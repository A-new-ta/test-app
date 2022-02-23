import User from '../models/testAppModel.js'
import bcrypt from 'bcrypt';

class TestAppController {
    
    
    // create new user with bcrypt
    async createUser (req, res) {
        try {
            const body = req.body
            const user = new User(body);
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            user.save().then((doc) => res.status(201).send(doc));
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    // // create new user
    // async createUser (req, res) {
    //     try {
    //         const { email, password } = req.body;
    //         const user = await User.create({email, password})
    //         res.json(user)
    //     } catch (err) {
    //         res.status(500).json(err)
    //     }
    // }

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
            const id = req.params.id;
            if (!id) {
                res.status(400).json({message: 'no id'})
            }
            const user = await User.findByIdAndDelete(id);
            return res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }



    // update user
    async updateUser (req, res) {
        try {
            const user = req.body;
            if (!user._id) {
                res.status(400).json({message: 'no id'})
            }
            const updatedUser = await User.findByIdAndUpdate(user._id, user, {new: true});
            return res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err)
        }
    }
}


export default new TestAppController();