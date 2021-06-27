const {Router} = require('express');
const router = Router()
// /api/auth + /register
router.post('/register', async (req, res, next) => {
 try {
   const {email, password} = req.body
   
 }  catch (error) {
    next(error);
  }
} 
)

// /api/auth + /login
router.post('/login', async (req, res, next) => {

})
module.exports = router