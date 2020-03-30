const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const cors = require('express-cors')
const fileUpload = require('express-fileupload')
const files = require('./api/files')

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
  allowedOrigins: [
    'localhost:3000',
    'localhost:8080',
    '0.0.0.0:3000',
    '0.0.0.0:8080',
    'arvuti.local:8080',
    'arvuti.local:3000',
    '10.29.64.55:8080',
    '10.29.64.55:3000'
  ]
}))
app.use(fileUpload(
  /* {
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp')
  } */
  ))
app.use('/api/files', files)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on port ${port}... `)
})
  