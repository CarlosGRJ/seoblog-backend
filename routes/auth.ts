import express from 'express';
import { signup, signin, signout, requireSignin } from '../controllers/auth';

const router = express.Router();

// validators
import { runValidation } from '../middlewares';
import { userSigninValidator, userSignupValidator } from '../middlewares/auth';

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);
// test
router.get('/secret', requireSignin, (_req, res) => {
  res.json({
    message: 'you have access to secret page',
  });
});

module.exports = router;
