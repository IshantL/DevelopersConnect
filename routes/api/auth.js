const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');
//@route   GET api/auth
//@desc    Test route
//@access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await user.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route   POST api/auth
//@desc    Authenticate User and get token
//@access  Public
router.post('/',[ 
  check('email', 'please include a valid email').isEmail(),
  check('password', 'password is required').exists()
],async (req,res)=>{
  const errors =validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
  }

  const { email, password } =req.body;
  try{

    // See if user exists
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] })
    }
    // Get user Gravatar
    const avatar = gravatar.url(email,{
      s:'200',//size
      r:'pg',//
      d:'mm'
    })

    user = new User({
      name,
      email,
      avatar,
      password
    })
    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // return jsonwebtoken
    const payload = {
      user:{
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'),
    {expiresIn: 360000},
    (err,token) =>{
      if(err) throw err;
      res.json({token});
    });

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
  
});
module.exports = router;