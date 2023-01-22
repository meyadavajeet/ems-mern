const express = require('express');
const { getAllTransaction, addNewTransaction, editOldTransaction, deleteTransaction } = require('../controllers/transactionController');

//router object
const router = express.Router();

/**
 * routers start
 */
//GET || GET ALL TRANSACTION
router.post('/all-transaction', getAllTransaction);

//POST || CREATE TRANSACTION
router.post('/add-transaction', addNewTransaction);

//POST || EDIT TRANSACTION
router.post('/edit-transaction', editOldTransaction);

//POST || DELETE TRANSACTION
router.post('/delete-transaction', deleteTransaction);


module.exports = router;