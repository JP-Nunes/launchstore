const Product = require('../models/Product')

async function getImages(productId) {
   let files = await Product.files(productId)
   files = files.map(file => ({
      ...file,
      src: `${file.path.replace('public', '')}`
   }))

   return files
}

async function format(product) {
   const files = await getImages(product.id)
   product.img = files[0].src
   product.files = files
   product.formatedOldPrice = formatPrice(product.old_price)
   product.formatedPrice = formatPrice(product.price)

   const productsPromise = products.map(async product => {
      product.img = await getImage(product.id)
      product.oldPrice = formatPrice(product.old_price)
      product.price = formatPrice(product.price)
      return product
   })

   products = await Promise.all(productsPromise)
}

const LoadService = {
   load(service, filter) {
      this.filter = filter

      return this[service]()
   },
   product() {
      try {
         const product = await Product.findOne(this.filter)
         return product
      } catch (err)  {
         console.error(err)
      }
   },
   products() {},
   formatea
}

module.exports = LoadService