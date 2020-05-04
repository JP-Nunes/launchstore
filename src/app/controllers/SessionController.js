const User = require('../models/User')
const crypto = require('crypto')
const mailer = require('../../lib/mailer')

module.exports = {
   loginForm(req, res) {
      return res.render('session/login')
   },
   login(req, res) {
      req.session.userId = req.user.id

      return res.redirect('/users')
   },
   logout(req, res) {
      req.session.destroy()
      return res.redirect('/')
   },
   forgotForm(req, res) {
      return res.render('session/forgot-password')
   },
   async forgot(req, res) {
      const user = req.user

      try {
         const token = crypto.randomBytes(20).toString('hex')

         let now = new Date()
         now = now.setHours(now.getHours + 1)

         await User.update(user.id, {
            reset_token: token,
            reset_token_expires: now
         })

         await mailer.sendMail({
            to: user.email,
            from: 'no-reply@launchstore.com.br',
            subject: 'Recuperação de senha',
            html: `<h2>Esqueceu a senha?</h2>
            <p>Não se preocupe, é só clicar no link abaixo</p>
            <p>
               <a 
                  href="http://localhost:3000/users/password-reset?token=${token}" 
                  target="_blank"
               >
                  Recuperar Senha
               </a>
            </p>
            `
         })

         return res.render('session/forgot-password', {
            success: 'Senha Enviada! Verifique seu e-mail.'
         })
         
      } catch (err) {
         console.error(err)
         return res.render('session/forgot-password', {
            error: 'Erro inesperado! Tente novamente.'
         })
      }
   }
}