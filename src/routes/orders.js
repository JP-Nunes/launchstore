const express = require('express')
const routes = express.Router()

const OrderController = require('../app/controllers/OrderController')

const { redirectNotUser } = require('../app/middlewares/session')

routes.get('/', OrderController.index)
routes.get('/sales', OrderController.sales)
routes.get('/:id', OrderController.show)

routes.post('/', redirectNotUser, OrderController.post)
routes.post('/:id/:action', OrderController.update)

module.exports = routes;