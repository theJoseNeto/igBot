require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Browser = require('../browser');

class Instagram extends Browser {

    async login(user, pass) {

        try {

            await this.page.goto('https://www.instagram.com/accounts/login/')
            await this.page.waitForTimeout(3000)
            await this.page.type('input[type="text"]', user);
            await this.page.type('input[type="password"]', pass);
            await this.page.click('button[type="submit"]');

            let userOrPassIsCorrect = await this.checkCredentials();

            userOrPassIsCorrect ? 'Usuario e senha corretos' : await this.page.evaluate(() => alert('verifique se digitou usuário e senha corretos...'));

            await this.page.waitForTimeout(5000);

        } catch (error) {
            return {
                err: 'Erro ao efetuar o login. Verifique se o usuário e senha estão corretos ou s'
            }
        }


    }


    async checkCredentials() {
        let userOrPassIsCorrect;
        await this.page.evaluate(() => {
            const errorMessage = document.querySelector('#slfErrorAlert');
            !errorMessage ? userOrPassIsCorrect = true : userOrPassIsCorrect = false;
        });

        return userOrPassIsCorrect;
    }

    async setCookieSession() {

        if (!fs.existsSync(path.resolve('src', 'cookies', 'cookies.json'))) {

            await this.login(process.env.USER, process.env.PASSWORD);

            const cookies = await this.page.cookies();

            const cookiesDirectory = path.resolve('src', 'cookies', 'cookies.json');
            const cookiesJsonString = JSON.stringify(cookies)
            await fs.promises.writeFile(cookiesDirectory, cookiesJsonString);

        } else {

            const cookiesString = await fs.promises.readFile(path.resolve('src', 'cookies', 'cookies.json'));
            const cookies = await JSON.parse(cookiesString);
            await this.page.setCookie(...cookies);
            await this.page.goto('https://instagram.com/');
        }
        return;
    }
    async notificationsONOF(action) {
        try {
            await this.page.evaluate(() => {

                const box = document.querySelector('div.piCib');
                const ON = document.querySelector("button.bIiDR");
                const OFF = document.querySelector("button.HoLwm ");

                if (box) action === false ? OFF.click() : ON.click();

                return;
            })
        } catch (e) { console.log(e) }
    }

    async scrollTimeLine() {
        await this.page.evaluate(() => {
            const y = document.body.scrollHeight.valueOf();
            while (y_position < y) {
                window.scrollY
            }

        })
    }

}


module.exports = Instagram;
