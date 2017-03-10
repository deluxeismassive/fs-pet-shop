const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const bodyParser = require('body-parser');
const morgan = require('morgan');

app.disable('x-powered-by');
app.use(morgan('short'));
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
    var check = JSON.parse(pet)
    if (id > check.length || id < 0) {
      res.setHeader('Content-Type','text/plain')
      res.sendStatus(404)
    }
    res.send(JSON.parse(pet)[id])
  })
})

app.post('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, pets) => {
    if (err) {
      return err
    }
    var obj = JSON.parse(pets);
    var age = parseInt(req.body.age);
    var kind = req.body.kind;
    var name = req.body.name;
    var newObj = { age, kind, name }

    if (Number.isNaN(age) || !kind || !name) {
      return res.sendStatus(400)
    }
    obj.push(newObj)

    var sendObj = JSON.stringify(obj)

    fs.writeFile(petsPath, sendObj, (err) => {
      if (err) {
        return err
      }
      res.setHeader('Content-Type','application/json  ')
      res.send(JSON.stringify(obj[obj.length-1]))
    })
  })
})

app.patch('/pets/:id', (req, res) => {
  var index = parseInt(req.params.id)
  fs.readFile(petsPath, 'utf8', (err, Jpets) => {
    if (err) {
      return err
    }

    var pets = JSON.parse(Jpets)
    id = parseInt(req.params.id)

    if (id < 0 || id >= pets.length) {
     return res.sendStatus(404);
    }

    const age = Number.parseInt(req.body.age);
    const { kind, name } = req.body;

    if (age) {
      pets[id].age = parseInt(age)
    }

    if (name) {
      pets[id].name = name
    }

    if (kind) {
      pets[id].kind = kind
    }

    var patchObj = JSON.stringify(pets)

    fs.writeFile(petsPath, patchObj, (err) => {
      if (err) {
        return err
      }
      res.send(pets[id])
    })
  })
})

app.delete('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, Jpets) => {
    if (err) {
      return err;
    }

    var id = parseInt(req.params.id);
    var pets = JSON.parse(Jpets);

    if (id < 0 || id >= pets.length) {
      return res.sendStatus(404);
    }

    var pet = pets.splice(id, 1)[0];
    var deleteObj = JSON.stringify(pets);

    fs.writeFile(petsPath, deleteObj, (err) => {
      if (err) {
        return err;
      }

      res.send(pet);
    });
  });
});



app.listen(port)

module.exports = app
