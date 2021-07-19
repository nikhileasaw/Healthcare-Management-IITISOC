const homeController = require("../controllers/homecontroller");

const initRoutes = (app) => {
  // routes

  // create home route
  app.get("/", homeController().index);
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
  app.post('/api/registereduser', async (req,res)=>{
    console.log(req.body);
    res.json({status:'okay'})
  });
  //login part ends
  app.use((req,res)=>{res.render("error");
  });

}

module.exports = initRoutes;
