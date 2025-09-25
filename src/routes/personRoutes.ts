import { Router } from 'express';
import { getCloseContacts, getPresentAtTime } from '../controllers/personController.ts';

const router = Router();

router.get('/:location/:date', getPresentAtTime);
router.get('/getCloseContacts/:name/:date', getCloseContacts);

export default router;