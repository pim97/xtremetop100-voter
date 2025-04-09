const Scrappey = require('scrappey-wrapper');
const qs = require('qs');

const readline = require('readline');
const fs = require('fs');

// Replace the following details with your own details
const SCRAPPEY_API_KEY = 'API_KEY';

// Create an instance of Scrappey
const scrappey = new Scrappey(SCRAPPEY_API_KEY);

async function run() {

    //Deprecated
    const product = await scrappey.get({
        "cmd": "request.get",
        "url": "https://www.xtremetop100.com/in.php?site=1132375983"
    })
    // // Print the retrieved listing data
    console.log(JSON.stringify(product, null, 2));

}

// Execute the main function
run();
