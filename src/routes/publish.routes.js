// src/routes/publish.routes.js
import express from 'express';
import { publish } from '../controllers/publish.controller.js';
import { topics } from '../controllers/topics.controller.js';
import { addClient } from '../controllers/client.controller.js';
import { status } from '../controllers/status.controller.js';

const router = express.Router();

router.post('/publish', publish);
router.post('/addclient', addClient);
router.post('/topics', topics);
router.post('/status', status); 
export default router;
