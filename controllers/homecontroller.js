const homeController = () => {
    // factory functions
    return {
      index: async (req, res) => {
        
        return res.render("home");
      },
      
    };
  };
  
  module.exports = homeController;
