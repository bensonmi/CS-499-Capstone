
const mongoose = require('mongoose');
//const Trip = require('../models/travlr');
const User = mongoose.model('User')
const Trip = mongoose.model('trips')

// GET: /trips - lists all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip
            .find({})
            .exec();

        if (trips.length === 0) {
            return res.status(404).json({ "message": "tripsList not found" });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};
const tripsFindCode  = async (req, res) => {
    try {
        const trips = await Trip
            .find({'code': req.params.tripCode})
            .exec();

        if (trips.length === 0) {
            return res.status(404).json({ "message": "tripsFindCode not found" });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};

const tripsAddTrip = async (req, res) => {
    console.log("tripsAddTrip")
    try {
        // Create a new Trip associated with the retrieved user
        const newTrip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        // Return success response with the created trip
        return res.status(201).json(newTrip);
    } catch (error) {
        console.error('tripsAddTrip Error adding trip:', error);

        // Handle specific errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "tripsAddTrip Validation error", error: error.message });
        }

        // Generic error handling
        return res.status(500).json({ message: "tripsAddTrip Failed to add trip" });
    }
};


const tripsDeleteTrip = async (req, res) => {
    try {
        console.log("Received trip code for deletion:", req.params.tripCode);

        const trip = await Trip.findOneAndDelete({ 'code': req.params.tripCode });

        if (!trip) {
            return res.status(404).send({
                message: "tripsDeleteTrip Trip not found with code " + req.params.tripCode
            });
        }

        console.log("Trip deleted successfully");
        return res.status(200).json({ message: "Trip deleted successfully" });
    } catch (err) {
        console.error("Error deleting trip:", err);

        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "tripsDeleteTrip Trip not found with code " + req.params.tripCode
            });
        }

        return res.status(500).json({ error: err.message });
    }
};


// const tripsDeleteTrip = async (req, res) => {
    
            
//             Trip.findOneAndDelete({'code': req.params.tripCode})
            
        
//             .then(trip => {
//                 if (!trip) {
//                     return res
//                         .status(404)
//                         .send({
//                             message: "tripsDeleteTrip Trip not found with code " + req.params.tripCode
//                         });
        
//                 }
//                 return res
                    

//             }).catch(err => {
//                 if (err.kind === 'ObjectId') {
//                     return res
//                         .status(404)
//                         .send({
//                             message: "tripsDeleteTrip Trip not found with code " + req.params.tripCode
//                         });
//                 }
//                 return res
//                     .status(500) // server error
//                     .json(err);
//             })
//             console.log("return from delete trip");

       


// }

const tripsUpdateTrip = async (req, res) => {
        Trip
        .findOneAndUpdate({'code': req.params.tripCode },{
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, { new: true })
        .then(trip => {
            if (!trip) {
                return res
                .status(404)
                .send({
                    message: "Trip not found with code " + req.params.tripCode
                });
            }
            res.send(trip);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                .status(404)
                .send({
                    message: "Trip not found with code " + req.params.tripCode
                });
            }
            return res
            .status(500) // server error
            .json(err);
        });
}


module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};



