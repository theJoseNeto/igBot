const puppeteer = require('puppeteer');
class Browser  {
   constructor() {
      this.page = null;
      this.browser = null;

   }

   async launchBrowser() {
      this.browser = await puppeteer.launch({ headless: false, ignoreDefaultArgs: ['--disable-extensions'] });
   }

   async newPage(url) {
      this.page = await this.browser.newPage();
      this.page.goto(url);

   }


}

module.exports = Browser;
