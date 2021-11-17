require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
const Browser = require("../browser");

class Instagram extends Browser {
    async login(user, pass) {
        try {
            await this.page.goto("https://www.instagram.com/accounts/login/");
            await this.page.waitForTimeout(3000);
            await this.page.type('input[type="text"]', user);
            await this.page.type('input[type="password"]', pass);
            await this.page.click('button[type="submit"]');

            await this.page.waitForTimeout(5000);
        } catch (error) {
            console.log(error);
        }
    }

    async setCookieSession() {
        if (!fs.existsSync(path.resolve("src", "cookies", "cookies.json"))) {
            await this.login(process.env.USER, process.env.PASSWORD);

            const cookies = await this.page.cookies();

            const cookiesDirectory = path.resolve("src", "cookies", "cookies.json");
            const cookiesJsonString = JSON.stringify(cookies);
            await fs.promises.writeFile(cookiesDirectory, cookiesJsonString);
        } else {
            const cookiesString = await fs.promises.readFile(
                path.resolve("src", "cookies", "cookies.json")
            );
            const cookies = await JSON.parse(cookiesString);
            await this.page.setCookie(...cookies);
            await this.page.goto("https://instagram.com/");
        }
        return;
    }
    async notificationsONOF(action) {
        try {
            await this.page.evaluate(() => {
                const box = document.querySelector("div.piCib");
                const ON = document.querySelector("button.bIiDR");
                const OFF = document.querySelector("button.HoLwm ");

                if (box) action === false ? OFF.click() : ON.click();

                return;
            });
        } catch (e) {
            console.log(e);
        }
    }

    async scrollTimeLine() {
        await this.page.evaluate(() => {
            const y = document.body.scrollHeight.valueOf();
            while (y_position < y) {
                window.scrollY;
            }
        });
    }

    async scrollPageToBottom(
        scrollSize = 250,
        scrollDelay = 100,
        scrollStepsLimit = null
    ) {
        const lastScrollPosition = await this.page.evaluate(
            async (pixelsToScroll, delayAfterStep, stepsLimit) => {
                const getElementScrollHeight = (element) => {
                    if (!element) return 0;
                    const { scrollHeight, offsetHeight, clientHeight } = element;
                    return Math.max(scrollHeight, offsetHeight, clientHeight);
                };
                const scrollToBottom = (resolve) => {
                    let lastPosition = 0;

                    const interval = setInterval(() => {
                        const { body } = document;
                        const availableScrollHeight = getElementScrollHeight(body);

                        window.scrollBy(0, pixelsToScroll);
                        lastPosition += pixelsToScroll;

                        if (
                            lastPosition >= availableScrollHeight ||
                            (stepsLimit !== null &&
                                lastPosition >= pixelsToScroll * stepsLimit)
                        ) {
                            clearInterval(interval);
                            resolve(lastPosition);
                        }
                    }, delayAfterStep);
                };

                return new Promise(scrollToBottom);
            },

            scrollSize,
            scrollDelay,
            scrollStepsLimit
        );

        return lastScrollPosition;
    }
}

module.exports = Instagram;
