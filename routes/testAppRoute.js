import Router from 'express';
import testAppController from '../controllers/testAppController.js';

const router = new Router();


router.get('/', testAppController.getAll);
router.get('/:id', testAppController.getUser);
router.post('/', testAppController.createUser);
router.put('/', testAppController.updateUser);
router.delete('/:id', testAppController.deleteUser);



export default router;