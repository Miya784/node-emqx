import express from 'express';
import { publish } from '../controllers/publish.controller.js';
import { topics } from '../controllers/topics.controller.js';
import { addClient } from '../controllers/client.controller.js';

const router = express.Router();

router.post('/publish', publish);
router.post('/addclient', addClient);
router.post('/topics', topics);
export default router;
