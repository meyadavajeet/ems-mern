const transactionModel = require('../models/transactionModel');
const moment = require('moment');

// get all transactions callback function
const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type, user_id, categories } = req.body;
    const transaction = await transactionModel.find({
      ...(frequency !== 'custom' ?
        {
          date: {
            $gt: moment().subtract(Number(frequency), 'd').toDate(),
          }
        }
        :
        {
          date: {
            $gte: selectedDate[0],
            $lte: selectedDate[1]
          }
        }
      ),
      user_id: user_id,
      ...(type !== 'all' && { type }),
      ...(categories !== 'other' && { categories }),
    });
    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

//add transactions callback function
const addNewTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    return res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

// edit old transaction callback function
const editOldTransaction = async (req, res) => {
  try {
    let result = await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload,
    );
    console.log(result, 'after update queries run on the system');
    res.status(200).json("Edit Successfully!!");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}


const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({
      _id: req.body.transactionId
    });
    res.status(200).send("Transaction Deleted !!!");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}



module.exports = { getAllTransaction, addNewTransaction, editOldTransaction,deleteTransaction };