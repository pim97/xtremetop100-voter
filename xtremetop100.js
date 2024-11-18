const Scrappey = require('scrappey-wrapper');
const qs = require('qs');

// Replace the following details with your own details
const SCRAPPEY_API_KEY = 'API_KEY';

// Create an instance of Scrappey
const scrappey = new Scrappey(SCRAPPEY_API_KEY);

async function run() {
    /**
     * Creates a session with Scrappey
     * This session uses a premium proxy located in the United States
     */
    const session = await scrappey.createSession({
        // proxy: 'http://user:pass@ip:port' //Optional, if you want to use a specific proxy
    })

    const site = 1126084465;

    const get = await scrappey.get({
        url: `https://www.xtremetop100.com/in.php?site=${site}`,
        session: session.session
    });

    const secureCaptcha = get.solution.response.match(
        new RegExp(
            `<input type="hidden" value="(\\d*)" name="secure_captcha_check"`
        )
    )[1];

    const ticki = get.solution.response.match(
        new RegExp(
            `<input type="submit" value="(.*)" style="padding: 6px 10px 6px 10px;" name="ticki">`
        )
    )[1];

    const product = await scrappey.post({
        url: "https://www.xtremetop100.com/in-post.php?site=1126084465",
        postData: qs.stringify({
            site: site,
            secure_captcha_check: secureCaptcha,
            phone_number: "",
            captcha_code: "f34f5",
            ticki: ticki
        }),
        session: session.session
    })

    // // Print the retrieved listing data
    console.log(JSON.stringify(product, null, 2));

}

// Execute the main function
run();