const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

app.use( (req, res, next) => {
  res.header({"Access-Control-Allow-Origin": "*"});
  res.header({'Access-Control-Allow-Methods': "GET, PUT, POST, DELETE"});
  res.header({'Access-Control-Allow-Headers': "Content-Type"});
  next();
})


MongoClient.connect('mongodb://localhost:27017/diathymia', function (err, db) {
  if (err) throw err
  const collection = db.collection('diathymia')
  app.post('/existUsername', function (req, res) {
    const name = req.body.name
    collection.find({name: name}).toArray(function (err, result) {
      console.log(result);
      res.status(200).send({found: result.length ? true : false})
  })
  // .find().toArray(function (err, result) {
  //   if (err) throw err
  //
  //   console.log(result)
  })
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', function (req, res) {
  res.status(200).send({test:'test'})
})


app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})
