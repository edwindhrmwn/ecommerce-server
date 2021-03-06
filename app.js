if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    require('dotenv').config()
  }

const express = require('express')
const cors = require('cors')
const app = express()
const user = require('./routers/user')
const product = require('./routers/product')
const errorHandler = require('./middleware/errorhandler')
const customer = require('./routers/cart')

app.use(cors())
app.use(express.urlencoded({ extended:true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello app')
})
app.use(user)
app.use(customer)
app.use(product)
app.use(errorHandler)

module.exports = app