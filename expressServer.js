
'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');

app.use(morgan('short'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, pets) => {
    if (err) {
      return err;
    }
    res.send(JSON.parse(pets));
  });
});

app.get('/pets/:id', (req, res) => {
  var id = parseInt(req.params.id)
  fs.readFile(petsPath, 'utf8', (err, pet) => {
    if (err) {
      return err
    }
    if (id >= 2 || id < 0) {
      return res.sendStatus(404)
    }
    res.send(JSON.parse(pet)[id])
  })
})

module.exports = app
