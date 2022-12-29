const transactionModel = require('../models/transactionModel');

// get all transactions callback function
const getAllTransaction = async (req, res) => {
  try {
    const transaction = await transactionModel.find({ user_id: req.body.user_id });
    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//add transactions callback function
const addNewTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    return res.status(200).json(newTransaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

module.exports = { getAllTransaction, addNewTransaction };