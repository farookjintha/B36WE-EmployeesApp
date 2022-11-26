require('dotenv').config();
const express = require('express');
const cors = require('cors');
//Importing DB
const db = require('./db/connect');

//Importing all routes.
const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employees.routes');

const app = express();

//Establishing DB connection
db();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to our Employees App!')
});

app.use('/api', authRoutes);
app.use('/api', employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
})