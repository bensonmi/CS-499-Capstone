
const mongoose = require('mongoose');
//const Trip = require('../models/travlr');
const User = mongoose.model('User')
const Trip = mongoose.model('trips')

const getUser = async (req, res) => {
    console.log('in getUser');

    try {
        if (req.auth && req.auth.email) {
            const user = await User.findOne({ email: req.auth.email }).exec();

            if (!user) {
                return res.status(404).json({ message: "Email not found" });
            } else {
                console.log('User found:', user);
                console.log('yes User found:');
                return res.json({ message: "User found", user });
            }
        } else {
            return res.status(404).json({ message: "User was not found" });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// const getUser = (req, res, callback) => {
//     console.log('getUser');
//     if (req.auth && req.auth.email) {
//         User
//             .findOne({ email : req.auth.email })
//             .exec((err, user) => {
//                 if (!user) {
//                     return res  
//                         .status(404)
//                         .json({"message": "Email not found"});
//                 } else if (err) {
//                     console.log(err);
//                     return res
//                         .status(404)
//                         .json(err);
//                 }
//                 callback(req, 
//                     res.json({"message": "User found"}), 
//                     console.log('callback'),
//                     console.log(req.auth)
//                     );
//                 });
//     } else {
//         return res
//             .status(404)
//             .json({"message": "User was not found"});
//             console.log(req.payload);
//     }
// };

// const getUser = (req, res, callback) => {
//     if (req.payload && req.payload.email) {
//         User
//             .findOne({ email: req.payload.email })
//             .exec((err, user) => {
//                 if (!user) {
//                     return res
//                         .status(404)
//                         .json({ "message": "User not found" });
//                 } else if (err) {
//                     console.log(err);
//                     return res
//                         .status(404)
//                         .json(err);
//                 }
//                 callback(req,res,user.name);
//             });
//         } else {
//             return res
//                 .status(404)
//                 .json({ "message": "User not found" });
        
//     }
// };


// GET: /trips - lists all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip
            .find({})
            .exec();

        if (trips.length === 0) {
            return res.status(404).json({ "message": "Trip not found" });
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
            return res.status(404).json({ "message": "Trip not found" });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};

const tripsAddTrip = async (req, res) => {
    try {
        // Retrieve user asynchronously using getUser function
        const user = await User.findOne({ email: req.auth.email }).exec();

        // If user not found, return 404 Not Found response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new Trip associated with the retrieved user
        const newTrip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description,
            user: user._id // Associate the trip with the user
        });

        // Return success response with the created trip
        return res.status(201).json(newTrip);
    } catch (error) {
        console.error('Error adding trip:', error);

        // Handle specific errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error", error: error.message });
        }

        // Generic error handling
        return res.status(500).json({ message: "Failed to add trip" });
    }
};
// const tripsAddTrip = async (req, res) => {
//     console.log("*************tripsAddTrip*************")
//     getUser(req, res,(req, res) => {
//         console.log("*************tripsAddTrip inside getuser*************")
//         Trip
//         .create(
//             {
//                 code: req.body.code,
//                 name: req.body.name,
//                 length: req.body.length,
//                 start: req.body.start,
//                 resort: req.body.resort,
//                 perPerson: req.body.perPerson,
//                 image: req.body.image,
//                 description: req.body.description
//             },
//             (err, trip) => {
//                 if (err) {
//                     return res
//                     .status(400) // bad request
//                     .json(err);
//                 } else {
//                     return res
//                     .status(201) // created
//                     .json(trip);
//                 }
//             }
//         );
//     });
// }
// const tripsAddTrip = async (req, res) => {
//     const newTrip = new Trip({
//         code: req.body.code,
//         name: req.body.name,
//         length:req.body.length,
//         start:req.body.start,
//         resort:req.body.resort,
//         perPerson: req.body.perPerson,
//         image: req.body.image,
//         description: req.body.description
//     })


//     const q = await newTrip.save();
//     if(!q){
//         // database return no data
//         return res
//             .status(400)
//             .json(err);
//     } else {
//         return res
//         .status(201)
//         .json(q)
//     }
// };


const tripsUpdateTrip = async (req, res) => {
    getUser(req, res,(req, res) => {
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
    });
}

// const tripsUpdateTrip = async(req, res) => {
//     // Uncomment for debugging
//     console.log(req.params);
//     console.log(req.body);
//     const q = await Trip
//         .findOneAndUpdate(
//             {'code': req.params.tripCode },
//             {
//                 code: req.body.code,
//                 name: req.body.name,
//                 length: req.body.length,
//                 start: req.body.start,
//                 resort: req.body.resort,
//                 perPerson: req.body.perPerson,
//                 image: req.body.image,
//                 description: req.body.description
//             }
//         )
//         .exec();
//     if(!q)
//     { // Database returned no data
//         return res
//         .status(400)
//         .json(err);
//     } else { // Return resulting updated trip
//         return res
//         .status(201)
//         .json(q);
//     }
//     // Uncomment the following line to show results of operation
//     // on the console
//     // console.log(q);
// };

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip
};





// const mongoose = require('mongoose');
// //const Trip = require('../models/travlr');
// const Trip = mongoose.model('trips')

// // GET: /trips - lists all trips
// const tripsList = async (req, res) => {
//     try {
//         const trips = await Trip
//             .find({})
//             .exec();

//         if (trips.length === 0) {
//             return res.status(404).json({ "message": "Trip not found" });
//         } else {
//             return res.status(200).json(trips);
//         }
//     } catch (err) {
//         return res.status(500).json({ "error": err.message });
//     }
// };

// module.exports = {
//     tripsList
// };
