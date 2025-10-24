require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL =process.env.MONGO_URL;
const productRoutes = require('./routes/productRoutes');


// Middleware

app.use(express.json());
app.use('/api', productRoutes);

// Database Connection
mongoose.connect(DB_URL) 
    .then(() => {
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server is running on localhost:3000`);
        });
    })
    .catch(err =>{
        console.error('Database connection error:', err);

    });

    app.get('/', (req, res) => {
        res.status(200).json({ message: 'E-commerce is run!!' });
    });