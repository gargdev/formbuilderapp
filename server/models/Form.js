const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['single', 'multiple', 'text', 'image', 'date', 'rating'],
        required: true,
      },
      options: [
        {
          optionText: {
            type: String,
            required: function() {
              return ['single', 'multiple'].includes(this.type);
            },
          },
          image: {
            type: String,
          },
        },
      ],
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Form', FormSchema);
