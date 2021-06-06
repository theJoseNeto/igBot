const { instagramUrl } = require("./modules/url");
(async () => {
   const randomTime = require('./modules/runtimeAcions/index')

   require("dotenv").config();
   const IgBot = require('./modules/instagram/index');

   const USER = process.env.USER;
   const PASS = process.env.PASS;

   const bot = new IgBot()
   await bot.launchBrowser()
   await bot.newPage(instagramUrl);
   await bot.login(USER, PASS, randomTime);


})();