const express = require('express');
const router = express.Router();
const { submitResponse, getResponsesForForm } = require('../controllers/responseController');
const auth = require('../middleware/authMiddleware');

// @route    POST api/responses
// @desc     Submit response
// @access   Public
router.post('/', submitResponse);

// @route    GET api/responses/:formId
// @desc     Get responses for a form
// @access   Private
router.get('/:formId', auth, getResponsesForForm);

module.exports = router;
