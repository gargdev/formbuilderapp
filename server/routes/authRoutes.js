const express = require('express');
const router = express.Router();
const { register, login, getUser, logout } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post('/register', register);

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post('/login', login);

// @route    GET api/auth/user
// @desc     Get user data
// @access   Private
router.get('/user', auth, getUser);

// @route    POST api/auth/logout
// @desc     Logout user
// @access   Public
router.post('/logout', logout);

module.exports = router;
