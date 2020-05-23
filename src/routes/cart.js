const express = require('express')
const routes = express.Router()

const CartController = require('../app/controllers/CartController')

routes.get('/', CartController.loginForm)
routes.post('/:id/add-one', CartController.addOne)

module.exports = routes;