const Scrappey = require('scrappey-wrapper');
const qs = require('qs');

const readline = require('readline');
const fs = require('fs');

// Replace the following details with your own details
const SCRAPPEY_API_KEY = 'API_KEY';

// Create an instance of Scrappey
const scrappey = new Scrappey(SCRAPPEY_API_KEY);

/**
 * 
 * @param {*} question 
 * @returns 
 */
async function getUserInput(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function run() {
    /**
     * Creates a session with Scrappey
     * This session uses a premium proxy located in the United States
     */
    const session = await scrappey.createSession({
        // proxy: 'http://user:pass@ip:port' //Optional, if you want to use a specific proxy
        "cloudflareBypass": true
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

    const image = await scrappey.get({
        url: 'https://www.xtremetop100.com/securimage/securimage_show.php',
        session: session.session,
        base64: true
    })

    const base64Image = image.solution.base64Response;
    const decodedImage = Buffer.from(base64Image, 'base64');

    fs.writeFileSync('image.png', decodedImage);

    const captchaCode = await getUserInput('Enter the captcha code: ');

    const product = await scrappey.post({
        url: "https://www.xtremetop100.com/in-post.php?site=1126084465",
        postData: qs.stringify({
            site: site,
            secure_captcha_check: secureCaptcha,
            phone_number: "",
            captcha_code: captchaCode,
            ticki: ticki
        }),
        session: session.session
    })

    // // Print the retrieved listing data
    console.log(JSON.stringify(product, null, 2));

}

// Execute the main function
run();
