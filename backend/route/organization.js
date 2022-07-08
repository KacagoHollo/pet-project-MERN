const router = require('express').Router();
const http = require('../util/http');
const jwt = require('jsonwebtoken');
const config = require("../app.config");
const auth = require('../middleware/auth');
const User = require('../model/user');
const Org = require('../model/organization')

router.get('/', auth({block: false}), async (req, res) => {
    const orgs = await Org.findById(res.locals.organization.org_id);
    if (!orgs) return res.status(404).send("Organization not found.");
    res.json({orgs}).status(200);   
})

router.post('/create', auth({block: false}), async (req, res) => {
    const username = req.params.username;;

    const user = await User.findOne(username);
    if (!user) return res.send("User not found").status(404);

    // const orgId = await Org.findById(org_id);
    // if (!orgId) return res.send("Organization not found").status(404);

    // if (!req.body?.name || req.body?.description || req.body?.phone || req.body?.email) return res.status(400).send("Missing credentials")

    const orgPost = Org({
        name: req.body.name,
        description: req.body.description, 
        help: req.body.help,
        availability: req.body.availability,
        phone: req.body.phone,
        email:req.body.email,
        web: req.body.web,
        address: req.body.address,
        national_park: req.body.national_park,
        information: req.body.information,
        // admins: [{
        //     user_id: req.body.user_id,
        //     email_hint: req.body.email_hint
        // }]
    });

    // const token = jwt.sign({"userId": user?._id, "providers": user ? user.providers : { [provider]: oId }, name: organization.name}, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    await orgPost.save();
    res.json({orgPost}).status(200);
})
module.exports = router;