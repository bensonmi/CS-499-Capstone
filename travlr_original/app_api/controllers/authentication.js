const passport = require('passport');
const mongoose = require('mongoose');
// const User = mongoose.model('User');
const User = require('../models/user');
const register = (req, res) => {
    console.log(req.body);
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
        console.log("missing something")
        console.log(req.body.name)
        console.log(req.body.email)
        console.log(req.body.password)
        .status(400)
        .json({"message": "All fields required"});
    }
   
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save()
    .then(() => {
        const token = user.generateJwt();
        res.status(200).json({ token });
    })
    .catch(err => {
        console.log("err catch")
        res.status(400).json(err);
    });

    // user.save((err) => {
    //     if (err) {
    //         res
    //         .status(400)
    //         .json(err);
    //     } else {
    //         const token = user.generateJwt();
    //         res
    //         .status(200)
    //         .json({token});
    //     }
    // })
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
