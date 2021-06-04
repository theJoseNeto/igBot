const puppeteer = require('puppeteer');
const Validation = require('../validation/index');
const { instagramUrl } = require('../../url');

class Instagram {
    constructor() {
        this.page = null;
        this.browser = null;
    }

    async launchBrowser() {
        this.browser = await puppeteer.launch({ headless: false, ignoreDefaultArgs: ['--disable-extensions'] });
        this.page = await this.browser.newPage();
        this.page.goto(instagramUrl);
    }

    async login(user, pass, time) {
        try {

            setTimeout(async () => {

                await this.page.type("input[type='text']", user, { delay: time });
                await this.page.type("input[type='password']", pass, { delay: time });
                await this.page.click("button[type='submit']");

            }, 10000);


        } catch (error) {
            console.log('deu merda');
        }
    }


}
module.exports = Instagram;
