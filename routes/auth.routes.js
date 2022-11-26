const express = require('express');
const { signin, register, signout } = require('../controllers/auth.controller');

const router = express.Router();


router.post('/register', register);

router.post('/signin', signin);

router.get('/signout', signout);


module.exports = router;