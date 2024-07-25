const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  form: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  responses: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form.questions' },
      answer: [String],
      image: String,
      date: Date,
      rating: Number,
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
});

module.exports = mongoose.model('Response', ResponseSchema);
