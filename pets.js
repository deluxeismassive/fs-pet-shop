const action = process.argv[2]
const args = process.argv.slice(3, process.argv.length)
const fs = require('fs')

if (!action) {
  console.error('Usage: node pets.js [read | create | update | destroy]')
  process.exit(1)
} else {
  switch (action.toUpperCase()) {
  case 'READ':
    if (!args[0]) {
      fs.readFile('./pets.json', readFile)
    } else {
      fs.readFile('./pets.json', readFileArgs)
    }
    break;
  case 'CREATE':
    if (!args[0] || !args[1] || !args[2]) {
      console.error('Usage: node pets.js create AGE KIND NAME');
      process.exit(1)
    } else {
      fs.readFile('./pets.json', createFile)
    }
    break;
    default: console.error('Usage: node pets.js [read | create | update | destroy]')
  }
}

function readFile (err, data) {
  var file = JSON.parse(data)
  console.log(file);
}

function readFileArgs(err, data) {
  var file = JSON.parse(data)
  console.log(file[parseInt(args[0])]);
}

function createFile (err, data) {
  var file = JSON.parse(data)
  var obj = {age: parseInt(args[0]), kind: args[1], name: args[2]}
  file.push(obj)
  fs.writeFile('./pets.json', JSON.stringify(file), (err) => {
    if (err) {
      return err
    }
    console.log(obj);
  })
}
