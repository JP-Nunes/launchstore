const User = require('../models/User')
const { formatCep, formatCpfCnpj } = require('../../lib/utils')

module.exports = {
   registerForm(req, res) {
      return res.render("user/register")
   },
   async show(req, res) {
      const { user } = req

      user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
      user.cpf_cnpj = formatCep(user.cep)

      return res.render('user/index', { user })
   },
   async post(req, res) {
      
      const userId = await User.create(req.body)

      req.session.userId = userId

      return res.redirect('/users')
   },
   async update(req, res) {
      
   }
}