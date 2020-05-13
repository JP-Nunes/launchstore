const Product = require('../models/Product')

const { formatPrice, date } = require('../../lib/utils')

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

   const { day, hours, minutes, month } = date(product.updated_at)

   product.published = {
      day: `${day}/${month}`,
      hours: `${hours}h${minutes}`
   }

   return product
}

const LoadService = {
   load(service, filter) {
      this.filter = filter

      return this[service]()
   },
   product() {
      try {
         const product = await Product.findOne(this.filter)
         
         return format(product)
      } catch (err)  {
         console.error(err)
      }
   },
   products() {
      try {
         const products = await Product.findAll(this.filter)
         const productsPromise = products.map(format)

         return Promise.all(productsPromise)
      } catch (err) {
         console.error(err)
      }
   },
   format
}

module.exports = LoadService