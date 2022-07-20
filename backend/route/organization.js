const router = require('express').Router();
const http = require('../util/http');
const jwt = require('jsonwebtoken');
const config = require("../app.config");
const auth = require('../middleware/auth');
const User = require('../model/user');
const Org = require('../model/organization')


router.get('/all', auth({block: false}), async (req, res) => {
    console.log("Helló")
    const orgs = await Org.find().sort({id: 1});
    console.log(orgs)
    if (!orgs.length) return res.status(404).send("Orgs not found");
    res.json(orgs);  
})

router.post('/create', auth({block: true}), async (req, res) => {
    const username = req.params.username;

    const user = await User.findOne(username);
    if (!user) return res.status(404).send("User not found");

    const userId = res.locals.user.userId;

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
        admins: [{
            user_id: req.body.userId,
            email_hint: req.body.email_hint
        }]

    })

    const token = jwt.sign({"userId": user?._id, "providers": user ? user.providers : { [provider]: oId }, name: organization.name, orgId: organization._id}, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    await organization.save();
    res.status(200).json({ token, organization });
})

router.patch("/update", auth({block: true}), async (req, res) => {

    const username = req.params.username;

    const user = await User.findOne(username);
    if (!user) return res.status(404).send("User not found");

    const organization = await Org.findOneAndUpdate({
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
    
    const token = jwt.sign({"userId": user?._id, "providers": user ? user.providers : { [provider]: oId }, name: organization.name}, process.env.JWT_SECRET, { expiresIn: "1h" });

    await organization.save();
    res.status(200).json({ token, organization });
});
module.exports = router;