function redirectNotUser(req, res, next) {
   if(!req.session.userId) {
      return res.redirect('/users/login')
   }

   next()
}

function redirectUser(req, res, next) {
   if(req.session.userId) {
      return res.redirect('/users')
   }

   next()
}

module.exports = {
   redirectNotUser,
   redirectUser
}