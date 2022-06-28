const router = require('express').Router();
const http = require('../util/http')
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const auth = require('../middleware/auth')
const config = require("../app.config")


router.post('/login', auth({block: false}), async (req, res) => {

    const payload = req.body;
    if (!payload) return res.sendStatus(400);
    
    const code = payload.code;
    const provider = payload.provider;
    if (!code || !provider) return res.sendStatus(400);

    if (!Object.keys(config.auth).includes(provider)) return res.status(400).send("Wrong payload")

    
    const response = await http.post(config.auth[provider].token_endpoint, {
        "code": code,
        "client_id": config.auth[provider].client_id,
        "client_secret": config.auth[provider].client_secret,
        "redirect_uri": config.auth[provider].redirect_uri,
        "grant_type": config.auth[provider].grant_type,
    },
        {
            headers: {
                Accept: "application/json",
            },
        }
    ); 

    if (!response) return res.status(500).send("Token provider error");
    if (response.status !== 200) return res.sendStatus(401);
    
    let oId;
    const onlyOauth = !response.data.id_token;
    if (onlyOauth) {
        let accesToken = response.data.access_token;
        const userResponse = await http.post(
            config.auth[provider].user_endpoint, {
                headers: {
                    authorization: "Bearer " + accesToken,
                },
            }
        );
        if (!userResponse) return res.sendStatus(500)
        if (userResponse.status !== 200) return res.sendStatus(401);
        const id = config.auth[provider].user_id
        oId = userResponse.data[id];
    } else {
        const decoded = jwt.decode(response.data.id_token);
        if (!decoded) return res.sendStatus(500)
        oId = decoded.sub;
    }

    const key = `providers.${provider}`;
    const user = await User.findOne(
        { [key]: oId },

    ); 

    if (user && res.locals.user?.providers) {
        user.providers = {...user.providers, ...res.locals.user.providers}; 
        user = await user.save()
    }

    const sessionToken = jwt.sign({"userID": user?._id, "providers": user ? user.providers : { [provider]: oId }}, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ sessionToken });

});

router.post("/create", auth({block: true}), async (req, res) => {
    if (!req.body?.username) return res.sendStatus(400);
    const user = await User.create({username: req.body.username, providers: res.locals.user.providers});

    const sessionToken = jwt.sign({"userID": user._id, "providers": user.providers }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ sessionToken });
});

module.exports = router;