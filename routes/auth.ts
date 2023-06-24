import express from 'express';
import { signup } from '../controllers/auth';

const router = express.Router();

// validators
import { runValidation } from '../middlewares';
import { userSignupValidator } from '../middlewares/auth';

router.post('/signup', userSignupValidator, runValidation, signup);

module.exports = router;
