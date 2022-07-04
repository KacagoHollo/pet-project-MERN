const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../model/user');


router.get('/', auth({block: true}), async (req, res) => {
    const user = await User.findById(res.locals.user.userId);
    if (!user) return res.status(404).send("User not found.");
    res.json({user});
    
})

router.post('/', auth({ block: true }), async (req, res) => {
    if (
        !req.body.name ||
        !req.body.title ||
        !req.body.email ||
        !req.body.phone ||
        !req.body.document ||
        !req.body.confirmation
    )
    return res.status(404).send("User is not found");

    user.profile.push({
        name: req.body.name,
        title: req.body.title,
        email: req.body.email,
        phone: req.body.phone,
        document: req.body.document,
        confirmation: req.body.confirmation,
    })

    user
    .save()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).send(err);
    }); // return the whole user object
});

router.post('/:id/todos', async (req, res) => {
    // create todo in :id dashboard for a user, send created :todoid
})

router.patch('/:userId', auth({ block: true }), async (req, res) => {
    // update existing dashboard
    if (!req.params.userId) return res.sendStatus(400);

})
router.patch('/:id/todos/:todoId', async (req, res) => {
    // update existing :todoId todo in :id dashboard
})

router.delete('/:id', async (req, res) => {
    // delete dashboard
})

router.delete('/:id/todos/:todoId', async (req, res) => {
    // delete dexisting :todoId todo in :id dashboard
})

module.exports = router