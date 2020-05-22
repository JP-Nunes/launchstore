const { formatPrice } = require('./utils')

const Cart = {
   init(oldCar) {
      if(oldCar) {
         this.items = oldCar.items
         this.total  = oldCar.total
      } else {
         this.items = []
         this.total = {
            quantity: 0,
            price: 0,
            formatedPrice: formatPrice(0)
         }
      }

      return this
   },

   addOne(product) {
      let inCart = this.getCartItem(product.id)

      if(!inCart) {
         inCart = {
            product: {
               ...product,
               formatedPrice: formatPrice(product.price)
            },
            quantity: 0,
            price: 0,
            formatedPrice: formatPrice(0)
         }

         this.items.push(inCart)
      }

      if(inCart.quantity >= product.quantity) return this

      inCart.quantity++
      inCart.price = inCart.product.price * inCart.quantity
      inCart.formatedPrice = formatPrice(inCart.price)
   
      this.total.quantity++
      this.total.price += inCart.product.price
      this.formatedPrice = formatPrice(inCart.product.price)
   
      return this
   },

   removeOne(productId) {
      let inCart = this.getCartItem(productId)

      if(!inCart) return this

      inCart.quantity--
      inCart.price = inCart.product.price * inCart.quantity
      inCart.formatedPrice = formatPrice(inCart.price)
   
      this.total.quantity--
      this.total.price -= inCart.product.price
      this.total.formatedPrice = formatPrice(this.total.price)
   
      if(inCart.quantity < 1) {
         const itemIndex = this.items.indexOf(inCart)
         this.items.splice(itemIndex, 1)
         
         return this
      }

      return this
   },

   delete(productId) {
      const inCart = this.getCartItem(productId)
      if(!inCart) return this

      if(this.items.length > 0) {
         this.total.quantity -= inCart.quantity
         this.total.price -= (inCart.product.price * inCart.quantity)
         this.total.formatedPrice = formatPrice(this.total.price)
      }

      this.items = this.items.filter(item => inCart.product.id != item.product.id)
      return this
   },
   getCartItem(productId) {
      return this.items.find(item => item.product.id == product.id)
   }
}

const product = {
   id: 1,
   price: 199,
   quantity: 2
}

const product2 = {
   id: 2,
   price: 299,
   quantity: 1
}

console.log('add first cart item')
let oldCart = Cart.init().addOne(product)
console.log(oldCart)

console.log('add second cart item')
oldCart = Cart.init(oldCart).addOne(product)
console.log(oldCart)

console.log('add third cart item')
oldCart = Cart.init(oldCart).delete(product.id)
console.log(oldCart)

module.exports = Cart