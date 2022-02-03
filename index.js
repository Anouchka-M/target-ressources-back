require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const connection = require('./src/helper/db.js')
const ressources = require('./src/routes/ressources.js')


const port = process.env.PORT ?? 4242
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/ressources', ressources)


connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack)
    } else {
      console.log('connected as id ' + connection.threadId)
    }
  })
  
  let server = app.listen(4242, () => {
    console.log('listening on port', server.address().port)
  })