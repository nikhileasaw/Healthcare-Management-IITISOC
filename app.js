const express = require("express");
const path = require("path");
const app = express();


// assests
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static('static'))

// set template engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// routes
require(path.join(__dirname, "/routes/web"))(app);

app.listen(3000, () => {
  console.log("app now listening for requests on port 3000");
<<<<<<< HEAD
});
=======
});
>>>>>>> 0f950920287702f1145a5e6da42518feec4ef24a
