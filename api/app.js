const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3005;
const dbConnect = require('./config/dbConnect')
const userRoute = require('./route/userRoute')
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json());
dbConnect();

app.get('/', (_,res) => {
    res.send('Hello, this is the API server');
})

app.use('/api/users', userRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
