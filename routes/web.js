const homeController = require("../controllers/homeController");

const initRoutes = (app) => {
  // routes

  // create home route
  app.get("/", homeController().index);
  
}

module.exports = initRoutes;