const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const bookRoute = require('./router/books');
const ownerRoute = require('./router/owner'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/books', bookRoute);
app.use('/owner', ownerRoute);

mongoose.connect('mongodb://localhost/quickbook', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('MongoDB Connect'))

app.listen(5000);


