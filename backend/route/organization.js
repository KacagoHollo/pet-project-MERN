const router = require('express').Router();
const http = require('../util/http');
const jwt = require('jsonwebtoken');
const config = require("../app.config");
const auth = require('../middleware/auth');
const User = require('../model/user');
const Org = require('../model/organization')

router.get('/all', auth({block: false}), async (req, res) => {
    console.log('/api/orgs/all');
    const orgs = await Org.find().sort({id: 1});
    if (!orgs.length) return res.status(404).send("Orgs not found");
    res.json(orgs);  
})

router.post('/create', auth({block: true}), async (req, res) => {
    const username = req.params.username;

    const user = await User.findOne(username);
    if (!user) return res.send("User not found").status(404);

    // const orgId = await Org.findById(org_id);
    // if (!orgId) return res.send("Organization not found").status(404);

    // if (!req.body?.name || req.body?.description || req.body?.phone || req.body?.email) return res.status(400).send("Missing credentials")
    // const organization = await Org.findById(res.locals.organization._id);
    // const orgPost = Org({
    const organization = await Org.create({
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

    })

    // });

    const token = jwt.sign({"userId": user?._id, "providers": user ? user.providers : { [provider]: oId }, name: organization.name}, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    await organization.save();
    res.json({ token, organization }).status(200);
})

router.patch("/update", auth({block: true}), async (req, res) => {

    const username = req.params.username;

    const user = await User.findOne(username);
    if (!user) return res.send("User not found").status(404);

    const organization = await Org.findById(req.params.organization._id);
    if (!organization) return res.status(404).send("Organization not found.");

    organization.name = req.body.name;
    organization.description = req.body.description;
    organization.help = req.body.help;
    organization.availability = req.body.availability;
    organization.phone = req.body.phone;
    organization.email =req.body.email;
    organization.web = req.body.web;
    organization.address = req.body.address;
    organization.national_park = req.body.national_park;
    organization.information = req.body.information;
    
    const token = jwt.sign({"userId": user?._id, "providers": user ? user.providers : { [provider]: oId }, name: organization.name}, process.env.JWT_SECRET, { expiresIn: "1h" });

    await organization.save();
    res.status(200).json({ token, organization, user });
});
module.exports = router;