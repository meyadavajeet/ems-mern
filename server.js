const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDB');
const path = require('path');

//config dot env file
dotenv.config();

//database call
connectDb();


//rest object
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

/**
 * configure static pages for the production deployment
 */
app.use(express.static(path.join(__dirname, './client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

/**
 * // end of configuration for production
 */

/**
 * Routing section start
 */
const endPoint = process.env.API_END_POINT;
// user routes
app.use(endPoint + 'users', require('./routes/userRoute'));

//transaction routes
app.use(endPoint + 'transaction', require('./routes/transactionRoute'));

// app.use('/api/v1/something',require('./routes/somethingRoute'));
/**
 * End of Routing
 */

//port configuration
const PORT = process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})
