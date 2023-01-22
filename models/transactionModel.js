const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"]
  },
  categories: {
    type: String,
    required: [true, "Category is required"]
  },
  reference: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  date: {
    type: Date,
    // type: String,
    required: [true, "Date is required"]
  },
},
  {
    timestamp: true
  },
);
const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;