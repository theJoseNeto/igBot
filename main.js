require("dotenv").config();
const { instagramUrl } = require('./src/modules/url');
const IgBot = require('./src/modules/instagram/index');

(async () => {

   const bot = new IgBot();
   try {

      await bot.launchBrowser();
      await bot.newPage(instagramUrl);
      await bot.setCookieSession();
      await bot.scrollPageToBottom();
      
   } catch (error) {
      console.log(error);      
   }



})();