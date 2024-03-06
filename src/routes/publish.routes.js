import express from 'express';
import { publish,topics } from '../controllers/publish.controller.js';
import { addClient } from '../controllers/client.controller.js';

const router = express.Router();

router.post('/publish', publish);
router.post('/addclient', addClient);
router.post('/topics', topics);
export default router;
