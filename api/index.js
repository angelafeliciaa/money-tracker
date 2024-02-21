
// angelafc
// gh2yzndlZt6E0XIR
const express = require ('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json()); // Add this middleware to parse JSON in the request body

// test endpoint
app.get('/api/test', (req, res) => {
    res.json('test ok2');
});

// endpoint for posting a new transaction
// post transactions
app.post('/api/transaction', async(req, res) => {

    await mongoose.connect(process.env.MONGO_URL);

    // grab all data from req.body
    const {name, description, datetime, price} = req.body;
    const transaction = await Transaction.create({name, description, datetime, price});
    res.json(transaction);
});


// endpoint for displaying on screen!
// get transactions
app.get('/api/transactions',  async(req, res) => {

    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();

    res.json(transactions);

});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});