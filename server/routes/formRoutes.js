const express = require('express');
const router = express.Router();
const { createForm, getUserForms, getForm } = require('../controllers/formController');
const auth = require('../middleware/authMiddleware');

// @route    POST api/forms
// @desc     Create new form
// @access   Private
router.post('/', auth, createForm);

// @route    GET api/forms
// @desc     Get forms created by the user
// @access   Private
router.get('/', auth, getUserForms);

// @route    GET api/forms/:id
// @desc     Get a single form
// @access   Private
router.get('/:id', auth, getForm);

module.exports = router;
