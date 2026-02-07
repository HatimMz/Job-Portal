const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: String,
    location: {type:String, required: true},
    salary: {type: Number,default:0},
})


module.exports = mongoose.model('Job', jobSchema);