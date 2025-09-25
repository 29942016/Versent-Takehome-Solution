import { Router } from 'express';
import { get, getByNameAndTime } from '../controllers/locationController.ts'

const router = Router();

router.get('/', get);
router.get('/:name/:date', getByNameAndTime);

export default router;