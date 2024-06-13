const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication')
const tripsController = require('../controllers/trips');
const { expressjwt: express_jwt } = require("express-jwt");

const auth = express_jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ["HS256"]
});

// define route for our trips endpoint
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);
  
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindCode)
  .put(tripsController.tripsUpdateTrip)
  .delete(tripsController.tripsDeleteTrip);
module.exports = router;