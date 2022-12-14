const router = require('express').Router();
const http = require('../util/http');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const auth = require('../middleware/auth');
const config = require("../app.config");
const org  = require('../model/organization')

router.post('/login', auth({block: false}), async (req, res) => {

    const payload = req.body;
    if (!payload) return res.sendStatus(400);
    
    const code = payload.code;
    const provider = payload.provider;
    if (!code || !provider) return res.sendStatus(400);

    if (!Object.keys(config.auth).includes(provider)) return res.status(400).send("Wrong payload")

    const configProvider = config.auth[provider]; // google or github
    const link = configProvider.tokenEndpoint;

    const response = await http.post(link,
    {
        code: code,
      client_id: configProvider.clientId,
      client_secret: configProvider.clientSecret,
      redirect_uri: configProvider.redirectUri,
      grant_type: "authorization_code",
    },
    {
        headers: {
            Accept: "application/json",
            },
        }
    ); 

    if (!response) return res.status(500).send("Token provider error");
    if (response.status !== 200) {
        console.log(response.data)
        return res.status(401).send("Nope");
    }
    
    let oId;
    // const onlyOauth = !response.data.id_token;
    // if (onlyOauth) {
    //     let accessToken = response.data.access_token;
    //     const userResponse = await http.post(
    //         configProvider.userEndpoint, 
    //         {},
    //         {
    //             headers: {
    //                 authorization: "Bearer " + accessToken,
    //             },
    //         }
    //     );
    //     if (!userResponse) return res.status(500).send("Provider error")
    //     if (userResponse.status !== 200) return res.sendStatus(401);
    //     oId = userResponse.data.id;
    // } 
    // else {
        const decoded = jwt.decode(response.data.id_token);
        if (!decoded) return res.status(500).send("Provider token error")
        oId = decoded.sub;
    // }

    const key = `providers.${provider}`;
    const user = await User.findOne(
        { [key]: oId },

    ); 

    // if (user && res.locals.user?.providers) {
    //     user.providers = {...user.providers, ...res.locals.user.providers}; 
    //     user = await user.save()
    // }

    const token = jwt.sign({"userId": user?._id, "providers": user ? user.providers : { [provider]: oId }, "username": user?.username, "name": user?.name, "title": user?.title, "email": user?.email, "phone": user?.phone}, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });

});

router.post("/create", auth({block: true}), async (req, res) => {
    if (!req.body?.username) return res.status(404).send("Missing credentials");
    const user = await User.create({
        username: req.body.username,
        providers: res.locals.user.providers,
        name: req.body.name,
        title: req.body.title,
        email: req.body.email,
        phone: req.body.phone,
        // organization: org ? org.name : ""

    });

    const token = jwt.sign({"userId": user._id, "providers": user.providers, "username": user.username, "name": user.name, "title": user.title, "email": user.email, "phone": user.phone }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
});

router.patch("/update", auth({block: true}), async (req, res) => {
    // const username = req.params.username;

    // if (!username) return res.status(404).send("User not found");

    // const user = await User.findOne(username);
    // if (!user) return res.send("User not found").status(404);

    const user = await User.findById((res.locals.user.userId), {
        // username: req.body.username,
        // providers: res.locals.user.providers,
        name: req.body.name,
        title: req.body.title,
        email: req.body.email,
        phone: req.body.phone,
})
    
    const token = jwt.sign({"userId": user?._id, "providers": user ? user.providers : { [provider]: oId }, "username": user?.username, "name": user?.name, "title": user?.title, "email": user?.email, "phone": user?.phone}, process.env.JWT_SECRET, { expiresIn: "1h" });

    await user.save();
    res.status(200).json({ token });
});

router.delete("/:userId", auth({ block: true }), async (req, res) => {
  
    const userId = req.params.userId;
    const user = await User.findById(res.locals.user.userId);
    if (!user) res.status(404).send("User not found.");
  
    User.findByIdAndDelete(userId, async (err, result) => {
        if(err) console.log(err); 
        else console.log(result) 

        const token = jwt.sign({"userId": user?._id, "providers": user ? user.providers : { [provider]: oId }, "username": user?.username, "name": user?.name, "title": user?.title, "email": user?.email, "phone": user?.phone}, process.env.JWT_SECRET, { expiresIn: "1h" });

        // await user.save();
        res.status(200).json({token});
    })
  
  });

  router.get('/all', auth({block: false}), async (req, res) => {
    console.log("Hell??")
    const users = await User.find().sort({id: 1});
    console.log(users)
    if (!users.length) return res.status(404).send("Users not found");
    res.json(users);  
})

module.exports = router;