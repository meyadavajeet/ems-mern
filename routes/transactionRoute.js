const express = require('express');
const { getAllTransaction, addNewTransaction } = require('../controllers/transactionController');

//router object
const router = express.Router();

/**
 * routers start
 */
//GET || GET ALL TRANSACTION
router.post('/all-transaction', getAllTransaction);

//POST || CREATE TRANSACTION
router.post('/add-transaction', addNewTransaction);


module.exports = router;