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

module.exports = router;