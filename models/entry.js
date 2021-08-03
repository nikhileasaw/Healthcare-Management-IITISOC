const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    }
})

const Entry = mongoose.model('doctors', entrySchema);
module.exports = Entry;