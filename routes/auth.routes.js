const express = require('express');
const { signin, register, signout, forgotPassword, resetPassword } = require('../controllers/auth.controller');

const router = express.Router();


router.post('/register', register);

router.post('/signin', signin);

router.get('/signout', signout);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:userID/:token', resetPassword);




module.exports = router;