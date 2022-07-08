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
    // const org_id = res.locals.organization.org_id;

    const user = await User.findOne(username);
    if (!user) return res.send("User not found").status(404);

    // const orgId = await Org.findById(org_id);
    // if (!orgId) return res.send("Organization not found").status(404);

    const orgPost = Org({
        name: req.body.name,
        description: {type: String, required: true}, // empty string is enough
        help: {type: Boolean, required: true},
        availability: {type: Array, required: true},
        phone: {type: Array, required: true},
        email: {type: String},
        web: {type: String},
        address: {type: Array},
        national_park: {type: String},
        information: {type: String},
        admins: [{
            user_id: {type: mongoose.SchemaTypes.ObjectId, ref: "User"},
            email_hint: {type: String}
        }]
    });
    orgPost.save();
    res.json(orgPost).status(200);
})
module.exports = router;