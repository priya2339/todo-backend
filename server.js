const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todos'); 
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


app.use('/api/todos', todoRoutes);

// app.get('/', (req, res) => {
//     res.send("API is working correctly!")
// })


app.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos); 
    } catch (err) {
        res.status(500).json({ message: 'Error fetching todos', error: err });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
