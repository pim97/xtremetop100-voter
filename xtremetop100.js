const Scrappey = require('scrappey-wrapper');
const qs = require('qs');

const readline = require('readline');
const fs = require('fs');

// Replace the following details with your own details
const SCRAPPEY_API_KEY = 'API_KEY';

// Create an instance of Scrappey
const scrappey = new Scrappey(SCRAPPEY_API_KEY);

async function run() {

    const product = await scrappey.get({
        "cmd": "request.get",
        "url": "https://www.xtremetop100.com/in.php?site=1132375983",
        "whitelistedDomains": ["recaptcha", "hcaptcha"],
        "browserActions": [
            {
                "type": "solve_captcha",
                "captcha": "turnstile"
            },
            {
                "type": "wait_for_selector",
                "cssSelector": "[name='ticki']"
            },
            {
                "type": "if",
                "condition": "[...document.querySelectorAll('script')].find(s => s.textContent.includes('var captchaChoice =')).innerText.includes('var captchaChoice = 1')",
                "then": [
                    {
                        "type": "solve_captcha",
                        "captcha": "hcaptcha",
                        "captchaData": {
                            "sitekey": "dcd2efd8-43d4-41bc-8e54-50682e8a8faa"
                        }
                    },
                    {
                        "type": "execute_js",
                        "code": "document.getElementsByName('g-recaptcha-response')[0].value = '{javascriptReturn[0]}'"
                    },
                    {
                        "type": "execute_js",
                        "code": "document.getElementsByName('h-captcha-response')[0].value = '{javascriptReturn[0]}'"
                    }
                ],
                "or": [
                    {
                        "type": "solve_captcha",
                        "captcha": "recaptchav2",
                        "captchaData": {
                            "sitekey": "6Le7mwwbAAAAAKIGqjAy7l6mjqyvMQydDF2WI8-2"
                        }
                    },
                    {
                        "type": "execute_js",
                        "code": "document.getElementsByName('g-recaptcha-response')[0].value = '{javascriptReturn[0]}'"
                    }
                ]
            },
            {
                "type": "click",
                "cssSelector": "[name='ticki']"
            },
            {
                "type": "execute_js",
                "code": "document.querySelector(\"div[style*='display: grid;']\")?.setAttribute(\"style\", \"width: fit-content; margin: 0 auto;\");"
            },
            {
                "type": "solve_captcha",
                "captcha": "turnstile"
            }
        ]
    })
    // // Print the retrieved listing data
    console.log(JSON.stringify(product, null, 2));

}

// Execute the main function
run();
