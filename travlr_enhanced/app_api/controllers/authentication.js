const passport = require('passport');
const mongoose = require('mongoose');
//const User = mongoose.model('users');
const User = require('../models/user');
const register = (req, res) => {
    console.log(req.body);
    console.log("0");
    if (!req.body.name || !req.body.email || !req.body.password) {

        
        console.log("missing something")
        console.log(req.body.name)
        console.log(req.body.email)
        console.log(req.body.password)
        .status(400)
        .json({"message": "All fields required"});
        return res
    }
    console.log("1");
    const user = new User();
    console.log("2");
    user.name = req.body.name;
    console.log("3");
    user.email = req.body.email;
    console.log("4");
    user.setPassword(req.body.password);
    console.log("5");
    user.save()
    .then(() => {
        const token = user.generateJwt();
        res.status(200).json({ token });
    })
    .catch(err => {
        console.log("err catch")
        res.status(400).json(err);
    });
};

    
const login = (req, res) => {
    console.log('Received login request');
    if (!req.body.email || !req.body.password) {
        return res
        .status(400)
        .json({"message": "All fields required"});
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err)
            console.log("auth error")
            return res
            .status(404)
            .json(err);
        }
        if (user) {
            const token = user.generateJwt();
            res
            .status(200)
            .json({token});
        } else {
            res
            .status(401)
            .json(info);
        }
    })(req, res);
};
module.exports = {
    register,
    login
};
