const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user');

router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User({
        username,
        email,
        password: await User.encryptPass(password)
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 60 * 60 * 24
    })

    res.json({ auth: true, token })
})

router.get('/me', async (req, res, next) => {

    const token = req.headers['x-acces-token'];

    if (!token) {
        return res.status(401).json({
            auth: false,
            message: "no token provided"
        });
    }

    const decoded = jwt.verify(token, config.secret);

    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) {
        return res.status(404).json({ status: "No user found" })
    }

    res.json(user)
})

router.post('/signin', async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send("The email doens exists");
    }

    const passValid = await user.validatePass(password);
    if (!passValid) {
        return res.status(401).json({ auth: false, token: null })
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 60 * 60 * 24
    })

    res.json({ auth: true, token });
})

module.exports = router;