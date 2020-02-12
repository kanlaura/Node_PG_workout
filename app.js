const express = require('express');
const path = require('path');
const parser = require('body-parser');
const app = express();

const apinaRouter = require('./routes/apina');
const napinaRouter = require('./routes/napina');
const peopleRouter = require('./routes/people');
const sittenRouter = require('./routes/sitten');
const patriqueRouter = require('./routes/patrique');

app.use(parser.json());
app.use('/api/', apinaRouter);
app.use('/napi/', napinaRouter);
app.use('/papi/', peopleRouter);
app.use('/sapi/', sittenRouter);
app.use('/patpi/', patriqueRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);

module.exports = app;