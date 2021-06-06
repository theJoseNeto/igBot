const puppeteer = require('puppeteer');
const Browser = require('../browser/index');
const EngagementFunctions = require('./engagement_modules/index');
const { instagramUrl } = require('../url')

class Instagram extends Browser {

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
