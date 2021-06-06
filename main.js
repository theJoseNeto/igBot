const { instagramUrl } = require("./modules/url");

(async () => {

   require("dotenv").config();
   const IgBot = require('./modules/instagram/index');

   const USER = process.env.USER;
   const PASS = process.env.PASS;

   const randomTime = async (max = 55, min = 45) => Math.floor(Math.random() * (max - min + 1)) + min;
   const time = randomTime();

   const bot = new IgBot()
   await bot.launchBrowser()
   await bot.newPage(instagramUrl);
   await bot.login(USER, PASS, time);


})();