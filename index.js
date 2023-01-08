
const express = require('express');

const connectWithDb = require('./config/db');
require('dotenv').config()


//connect with database
connectWithDb();


const { errorHandler } = require('./middlewares/errorMiddleware');
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

//adding cors security
const cors = require('cors')
app.use(cors({
    origin: '*'
}));


app.use('/api/habits', require('./routes/habitRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.listen(port, () => console.log(`Server started on port ${port}`));