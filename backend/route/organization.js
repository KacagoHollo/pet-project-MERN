const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../model/user');

router.get('/org', auth({block: false}), async (req, res) => {
    const orgs = await User.findById(res.locals.user.userId);

    res.json({user});
   
})

module.exports = router;