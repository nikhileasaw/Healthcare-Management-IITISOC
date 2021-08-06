var mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({

    name : String,
    email : String,
    phonenumber : String,
    doctor:String,
    date:Date
});

module.exports = new mongoose.model("Appointment",appointmentSchema);
