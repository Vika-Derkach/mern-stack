const {Router} = require('express');
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
// /api/auth + /register
router.post('/register',
[
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password min length must be 6 symbols')
      .isLength({min: 6})
],
 async (req, res, next) => {
 try {

   const errors = validationResult(req)
   if(!errors.isEmpty()) {
       return res.status(400).json({
           errors: errors.array(),
           message: 'Incorrect data during registration'
       })
   }
   const {email, password} = req.body
   const candidate = await User.findOne({email})
///check if there are no the same user
   if (candidate) {
     return  res.status(400).json({ message: "Such user already exists"})
   }
   ///якщо такого немає то створюємо нового User
   const hashedPassword = await bcrypt.hash(password, 11)//шифруємо пароль
   const user = new User({email, password: hashedPassword})

///чекаємо  поки він збережеться
   await user.save()
//передаємо на фронт
   res.status(201).json({message: 'User has been created'})
//fetch('/register', {method: 'POST', body: JSON.stringify({email: 'fdsfds'})}).then((res) => res.json()).then(data => {console.log(data)})

 }  catch (error) {
    next(error);
  }
} 
)

// /api/auth + /login
router.post('/login', async (req, res, next) => {

})
module.exports = router