const express = require('express')
const fileUpload = require('express-fileupload')
const mongodb = require('mongodb')
const router = express.Router()

router.get('/', async (req, res) => {
  const cakes = await loadCakesCollection()
  await cakes.find( {} ).toArray((err, result) => {
    if (err) throw err
    res.send(result)
  });
})  

router.post('/', async (req, res) => {
  const db = await loadCakesCollection()
  const file = req.files['files[0]']
  const filePath = __dirname + '/../../../src/assets/' + file.name
  const fileName = file.name;
  //console.log(req.body)
  const cake = {
    "cafeName" : req.body.cafeName,
    "location" : req.body.location,
    "imageFile" : fileName, 
    "looks" : req.body.looks,
    "taste" : req.body.taste,
    "bun" : req.body.bun,
    "createdAt" : new Date()
  }

  await file.mv(filePath, (err) => {
    if (err) {
      return res.status(400).send(err)
    }
    //res.status(201).send()
    console.log('file uploaded')
  })

  await db.insertOne(cake, (err, result) => {
    if (err) {
      re.status(400).send()
      return console.log(err)
    }
    console.log('saved to database::: ', cake)
    res.status(201).send()
  })
})

router.put('/:id', async (req, res) => {
  const cakes = await loadCakesCollection()
  let query = req.body
  await  cakes.updateOne( {_id: new mongodb.ObjectID(req.params.id)}, { $set : query } )
  await  cakes.updateOne( {_id: new mongodb.ObjectID(req.params.id)}, { $set : { "modified" : new Date()} } )
  console.log(query)
  res.status(200).send()
})

router.delete('/:id', async (req, res) => {
  const cakes = await loadCakesCollection()
  await  cakes.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
  res.status(200).send()
})

async function loadCakesCollection() {
  const client = await require('mongodb').MongoClient.connect('mongodb://localhost:27017/express', 
  { 
    useNewUrlParser: true,  
    useUnifiedTopology: true 
  })
  return db = client.db('express').collection('cakes')
}

module.exports = router
