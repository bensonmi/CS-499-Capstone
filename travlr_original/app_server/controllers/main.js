const index = (req, res) => {
    res.render("index", { title: "Travlr Getaways",homePage:true });
  };
  module.exports = {
    index
  };