const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator/check');

//@route   GET api/profile/me
//@desc    Get Current users profile
//@access  Private
//we are using mongoose that returns a promise , so need to use async await
router.get('/me', auth,async(req, res) => {
    try{
        const profile =await Profile.findOne({ user: req.user.id}).populate('user',
        ['name','avatar']);

        if(!profile){
            return res.status(400).json({msg:'There is no Profile for the user'});
        }

        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
});

//@route   POST api/profile/
//@desc    Create or update user profile
//@access  Private

router.post('/',[auth,[
    check('status','status is required')
    .not()
    .isEmpty(),
    check('skills','skills is required')
    .not()
    .isEmpty()
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.arrray()})
    }

    
})
module.exports = router;