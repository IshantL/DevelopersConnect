const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User')

//@route   POST api/users
//@desc    Register route
//@access  Public
router.post('/',[ check('name', 'Name is required').not().isEmpty(),
  check('email', 'please include a valid email').isEmail(),
  check('password', 'please enter a password with 6 or more characters').isLength({min:6})
],async (req,res)=>{
  const errors =validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
  }

  const { name, email, password } =req.body;
  try{

    // See if user exists
    let user = await User.findOne({email});
    if(user){
      res.status(400).json({ errors: errors.array() })
    }
    // Get user Gravatar

    //Encrypt password

    // return jsonwebtoken
    res.send('User Route'),
      console.log(req.body);

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
  
});

module.exports = router;