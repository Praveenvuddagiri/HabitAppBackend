
const express = require('express');
require('dotenv').config();
const { errorHandler } = require('./middlewares/errorMiddleware');
const connectWithDb = require('./config/db');
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

connectWithDb();

app.use('/api/habits', require('./routes/habitRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.listen(port, () => console.log(`Server started on port ${port}`));