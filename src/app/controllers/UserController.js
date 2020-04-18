class UserController {
   registerForm(req, res) {
      return res.redirect('/products')
   }
}

class Person {
   constructor(name) {
      this.name = name
   }

   getName() {
      return this.name
   }
}

module.exports = new UserController()