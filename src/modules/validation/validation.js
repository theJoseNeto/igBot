
class Validation {
   constructor(browser = null, page = null, url = null) {
      this.browser = browser;
      this.page = page;
      this.url = url
   }

   async urlvalidation() {
      let valid;
      if (this.url !== String || this.url[5] !== 's') {
         valid = false
      } else {
         valid = true;
      }
      return valid;
   }


   async userOrPassIncorrect() {
      let interval = setInterval(async () => {
         const errorMsg = await this.page.$('#slfErrorAlert');
         if (errorMsg !== null) {
            await this.browser.close();
            console.log("usuário e/ou senha incorretos!");
         }
         clearInterval(interval);
         return;
      }, 2000);
   }
}

module.exports = Validation;
