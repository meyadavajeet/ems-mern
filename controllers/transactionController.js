const transactionModel = require('../models/transactionModel');

// get all transactions callback function
const getAllTransaction = async (req, res) => {
  try {
    const transaction = await transactionModel.find({ user_id: req.body.userId });
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
    return await newTransaction.save();
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

module.exports = { getAllTransaction, addNewTransaction };