var fs = require('fs');
var foods = JSON.parse(fs.readFileSync('./data/foods.json','utf8'));

/* GET travle view */
const meals = (req, res) => {
    res.render('meals', {title: 'Travlr Getaways',foods,mealsPage:true});
};

module.exports = {
    meals
};