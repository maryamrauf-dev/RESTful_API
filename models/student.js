const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    rollNumber: {
      type: Number,
      required: true,
      default: 0,
    },
    feeSubmitted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Student', studentSchema);
