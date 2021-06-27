const {Router} = require('express');
const bcypt = require('bcrypt')
const User = require('../models/User')
const router = Router()
// /api/auth + /register
router.post('/register', async (req, res, next) => {
 try {
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


 }  catch (error) {
    next(error);
  }
} 
)

// /api/auth + /login
router.post('/login', async (req, res, next) => {

})
module.exports = router