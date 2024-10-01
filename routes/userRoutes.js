const express = require('express');

const router = express.Router();

const {
    Register,
    Login,
    CurrentUser
} = require('../controllers/usercontroller');

const ValidateToken = require('../middleware/ValidateToken');


router.post('/register', Register)

router.post('/login', Login)

router.get('/currentuser',ValidateToken, CurrentUser)

module.exports = router;