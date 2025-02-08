const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const scrapeEvents = require('./scrapers/Scrapevents');
const cron = require('node-cron');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const Event = require('./Models/Events');
const User = require('./Models/User');

// API to fetch events
app.get('/api/events', async (req, res) => {
    //scrapeEvents();
   
  let events = await Event.find();
 
    if(events.length==0){
        scrapeEvents();
        events = await Event.find();
        console.log(events);
    }


    res.json(events);
});

app.post('/api/email',async(req,res)=>{
    try{
    const {email}=req.body;
    
    const user = await User.findOne({email});
    if(user){
        res.json({message:'Email already exists',status:true});

    }else{
        const user = new User({email});
        await user.save();
        res.json({message:'Email added successfully',status:true});
    }}
    catch(err){

        console.log(err);
        res.json({message:'Error adding email',status:false});
        }
})

// Schedule scraper to run every 24 hours
cron.schedule('0 0 * * *', () => {
    console.log('Running scraper...');
    scrapeEvents();
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
