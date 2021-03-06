const product = require('express').Router()
const productControl = require('../controller/product')
const { authorization, authenticate } = require('../middleware/auth')

product.use(authenticate)
product.put('/customer/products/:id', productControl.productStock)

product.get('/products', productControl.readProduct)
product.get('/products/:id', productControl.getId)
product.post('/products', authorization,productControl.createProduct)
product.put('/products/:id', authorization, productControl.update)
product.delete('/products/:id', authorization, productControl.delete)

module.exports = product