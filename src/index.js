const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(express.json());

const port = process.env.PORT || '3000';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log('Servidor rodando,');
});
