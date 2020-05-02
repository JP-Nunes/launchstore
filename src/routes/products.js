const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const ProductController = require('../app/controllers/ProductController')
const SearchController = require('../app/controllers/SearchController')

const { redirectNotUser } = require('../app/middlewares/session')

//Search
routes.get('/search', SearchController.index)

//Products
routes.get('/create', redirectNotUser, ProductController.create)
routes.get('/:id', ProductController.show)
routes.get('/:id/edit', redirectNotUser, ProductController.edit)

routes.post('/', redirectNotUser, multer.array("photos", 6), ProductController.post)
routes.put('/', redirectNotUser, multer.array("photos", 6), ProductController.put)
routes.delete('/', redirectNotUser, ProductController.delete)

module.exports = routes;