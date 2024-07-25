const Response = require('../models/Response');

// Submit a response
exports.submitResponse = async (req, res) => {
  const { formId, responses } = req.body;
  try {
    const newResponse = new Response({
      form: formId,
      responses,
      user: req.user ? req.user.id : null,
    });

    const response = await newResponse.save();
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Get responses for form
exports.getResponsesForForm = async (req, res) => {
  try {
    const responses = await Response.find({ form: req.params.formId });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
