const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('./core/databases/prisma')

const routers = require('./routes')

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

app.use(cors( {
  origin: '*'
}))
app.use(helmet())

app.use(routers)

app.listen(PORT, () => {
  console.log('Application running: ', PORT)
})

module.exports = {
   app
}