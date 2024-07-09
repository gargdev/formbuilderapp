const Form = require('../models/Form');

exports.createForm = async (req, res) => {
  const { title, questions } = req.body;
  try {
    const newForm = new Form({
      title,
      questions,
      user: req.user.userId,
    });

    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserForms = async (req, res) => {
  try {
    const forms = await Form.find({ user: req.user.userId });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single form
exports.getForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
