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

      const product = await LoadProductService.load('product', { where: { id } })

      let { cart } = req.session

      console.log(product)

      req.session.cart = Cart.init(cart).addOne(product)

      return res.redirect('/cart')
   },
   removeOne(req, res) {
      let { id } = req.params
      let { cart } = req.session

      if(!cart) return res.redirect('/cart')

      cart = Cart.init(cart).removeOne(id)

      req.session.cart = cart

      return res.redirect('/cart')
   }
}