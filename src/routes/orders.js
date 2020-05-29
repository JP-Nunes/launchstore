const express = require('express')
const routes = express.Router()

const OrderController = require('../app/controllers/OrderController')

const { redirectNotUser } = require('../app/middlewares/session')

routes.get('/', OrderController.index)
routes.get('/sales', OrderController.sales)
routes.post('/', redirectNotUser, OrderController.post)

module.exports = routes;