const Cart = require('../../lib/cart')

const LoadProductService = require('../services/LoadProductService')


module.exports = {
   async index(req, res) {
      try {
         let { cart } = req.session

         cart = Cart.init(cart)

         return res.render('cart/index', { cart })
      }
      catch(err) {
         console.error(err)
      }
   },
   async addOne(req, res) {
      const { id } = req.params

      const product = LoadProductService.load('product', { where: { id } })

      let { cart } = req.session

      req.session.cart = Cart.init(cart).addOne(product)

      return res.redirect('/cart')
   }
}