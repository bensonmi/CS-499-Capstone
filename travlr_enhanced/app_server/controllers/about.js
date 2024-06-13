const about = (req, res) => {
    res.render('about', {title: 'About',aboutPage:true});
  };
  
  module.exports = {
    about
  };




