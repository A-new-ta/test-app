import User from '../models/testAppModel.js'
import bcrypt from 'bcrypt';

class TestAppController {
    
    // create new user
//     async createUser (req, res) {
//         try {
//             const { email, password } = req.body;
//             const user = await User.create({email, password})
//             res.json(user)
//         } catch (err) {
//             res.status(500).json(err)
//         }
//   }
  
    // create new user
    async createUser (req, res) {
      try {
        const { email, password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const user = await User.create({
          email: email,
          password: hashedPassword,
        });
        res.json(user)
        } catch (err) {
            res.status(500).json(err)
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
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword;
            
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

