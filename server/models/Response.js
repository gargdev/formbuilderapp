const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  form: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  responses: [{ questionId: mongoose.Schema.Types.ObjectId, answer: [String] }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
});

module.exports = mongoose.model('Response', ResponseSchema);
