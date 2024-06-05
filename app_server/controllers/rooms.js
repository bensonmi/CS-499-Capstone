var fs = require('fs');
var therooms = JSON.parse(fs.readFileSync('./data/rooms.json','utf8'));

/* GET travle view */
const rooms = (req, res) => {
    res.render('rooms', {title: 'Travlr Getaways',therooms,roomsPage:true});
};

module.exports = {
    rooms
};