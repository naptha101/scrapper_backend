const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: String,
    date: String,
    time: String,
    location: String,
    url: String,
    image: String
});

module.exports = mongoose.model('Event', EventSchema);
