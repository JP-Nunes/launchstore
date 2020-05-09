const Product = require('../models/Product')

const { formatPrice } = require('../../lib/utils')

module.exports = {
   async index(req, res) {
      try {
         let results
         let params = {}

         const { filter, category } = req.query

         if(!filter) return res.redirect("/")

         params.filter = filter

         if(category) {
            params.category = category
         }

         let products = await Product.search(params)

         async function getImage(productId) {
            let files = await Product.files(productId)
            files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path
            .replace("public", "").replace(/\\/g, "/")}`)

            return files[0]
         }

         const productsPromise = products.map(async product => {
            product.img = await getImage(product.id)
            product.oldPrice = formatPrice(product.old_price)
            product.price = formatPrice(product.price)
            return product
         })

         products = await Promise.all(productsPromise)
            
         const search = {
            term: req.query.filter,
            total: products.length
         }
            
         const categories = products.map(product => ({
            id: product.category_id,
            name: product.category_name
         })).reduce((filteredCategories, category) => {

         const found = filteredCategories.some(categ => categ.id == category.id)

         if(!found) filteredCategories.push(category)
                
         return filteredCategories
         }, []) 

         return res.render("search/index", { products, search, categories })
      
      } catch(err) {
         console.error(err)
      }
    }
}