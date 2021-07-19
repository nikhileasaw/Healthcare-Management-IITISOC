<<<<<<< HEAD
const homeController = require("../controllers/homeController");
=======
const homeController = require("../controllers/homecontroller");
>>>>>>> 0f950920287702f1145a5e6da42518feec4ef24a

const initRoutes = (app) => {
  // routes

  // create home route
  app.get("/", homeController().index);
<<<<<<< HEAD
  
}

module.exports = initRoutes;
=======
//creates login part
  app.get('/login',(req,res)=>{
    res.render("loginpage");
  });
  app.get('/signup',(req,res)=>{
    res.render("signup");
  });
  app.get('/adminlogin',(req,res)=>{
    res.render("adminlogin");
  });
  app.get('/patientlogin',(req,res)=>{
    res.render("patientlogin");
  });
  app.get('/doctorlogin',(req,res)=>{
    res.render("doctorlogin");
  });
  //login part ends
  app.use((req,res)=>{res.render("error");
  });

}

module.exports = initRoutes;
>>>>>>> 0f950920287702f1145a5e6da42518feec4ef24a
