import Router from 'express';
import testAppController from '../controllers/testAppController.js';
import { check } from 'express-validator';
import checkToken from '../middleware/testAppMiddleware.js'

const userRouter = new Router();

userRouter.post('/registration', [
    check('email', 'Email cannot be empty').notEmpty(),
    check('password', 'min length 6').isLength({min:6})
], testAppController.registrationUser);

userRouter.post('/login', testAppController.loginUser);

userRouter.get('/', testAppController.getAll);
userRouter.get('/:id', testAppController.getUser);
userRouter.put('/', checkToken, testAppController.updateUser);
userRouter.delete('/', checkToken, testAppController.deleteUser);



export default weatherRouter;