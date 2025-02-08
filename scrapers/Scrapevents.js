const puppeteer = require('puppeteer');

const Event = require('../Models/Events');

const scrapeEvents = async () => {
    console.log('Scraping events...');
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    
    await page.goto('https://www.eventbrite.com/d/australia--sydney/events/');

    const events = await page.evaluate(() => {
        

        return Array.from(document.querySelectorAll('.event-card')).map(event => ({
            title: event.querySelector('h3')?.innerText.trim() || '',
            date: event.querySelector('.Typography_body-md-bold__487rx')?.innerText.trim() || '',
            location: event.querySelector('.Typography_body-md__487rx')?.innerText.trim() || '',
            url: event.querySelector('a.event-card-link')?.href || '',
            image: event.querySelector('.event-card-image')?.src || ''
        }));
    });
    


    await browser.close();
//console.log(events)
    await Event.deleteMany(); // Remove old data
    await Event.insertMany(events);
    console.log(await Event.find());
    console.log('Events updated!');
};

module.exports = scrapeEvents;
