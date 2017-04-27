const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

app.use( (req, res, next) => {
  res.header({"Access-Control-Allow-Origin": "*"});
  res.header({'Access-Control-Allow-Methods': "GET, POST"});
  res.header({'Access-Control-Allow-Headers': "Content-Type"});
  next();
})


MongoClient.connect('mongodb://localhost:27017/diathymia', (err, db) => {
  if (err) throw err
  const users = db.collection('users')
  app.post('/existUsername', (req, res) => {
    const name = req.body.name
    users.find({userName: name}).toArray((err, result) => {
      res.status(200).send({found: result.length ? true : false})
    })
  })

  app.post('/addUser', (req, res) => {
    const data = req.body;
    users.insertOne(data, (err, result)=> {
    })
    res.status(200).send({ok:'ok'})
  })

  app.post('/addResult', (req, res) => {
    const data = req.body.data;
    name = req.body.name
    data.date = Date.now()
    users.update({userName: name},{$push: {"results": data}},(err,res)=>{
    })
    res.status(200).send({ok:'ok'})
  })

  app.get('/getResults', (req, res) => {
    const name = req.body.name
    users.find().toArray((err, result) => {
      res.status(200).send({result})
    })
  })

  app.post('/login', (req, res) => {
    const name = req.body.name
    const pass = req.body.password
    users.find({userName: name, password: pass }).toArray((err, result) => {
      res.status(200).send({result })
    })
  })


})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.listen(3001,()=>console.log('port=3001'))
