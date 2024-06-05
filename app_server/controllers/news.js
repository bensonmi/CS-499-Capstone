var fs = require('fs');
var latest_news = JSON.parse(fs.readFileSync('./data/latestnews.json','utf8'));
var vacation_tips = JSON.parse(fs.readFileSync('./data/vacationtips.json', 'utf8'));

/* GET travle view */
const news = (req, res) => {
    res.render('news', {title: 'Travlr Getaways',latest_news, vacation_tips,newsPage:true});
};

module.exports = {
    news
};



