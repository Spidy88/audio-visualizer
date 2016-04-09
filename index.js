const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('static'));
app.use(express.static('bower_components'));

app.listen(port);