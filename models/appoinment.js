var mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({

    name : String,
    doctor:String,
    date:String,
    desc:String
});

module.exports = new mongoose.model("Appointment",appointmentSchema);
