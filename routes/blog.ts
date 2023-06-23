import express from 'express';
import { time } from '../controllers/blog';

const router = express.Router();

router.get('/', time);

module.exports = router;