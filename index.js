const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
//Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DB!'));

//Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());


app.get('/api/user', function (req, res, next) {
  console.log('This is CORS-enabled for all origins!');
})

//Route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(5000, () => console.log('Server up and running'));