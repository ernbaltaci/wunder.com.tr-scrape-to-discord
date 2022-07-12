import { Client } from 'discord.js';
import puppeteer from 'puppeteer';

import scrapeToDiscord from '../helper/sendDiscord';

const TeknolojiCategory = async function (client: Client) {
  setInterval(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const scrapeURL = 'https://wunder.com.tr/air-jordan-1';

    await page.goto(scrapeURL, {
      waitUntil: 'networkidle2',
    });

    const scrapeImage = await page.$$eval(
      `div > div:nth-child(5) > div.flex-1.pb-4.pl-4.pr-4 > div.infinite-scroll-component__outerdiv > div > div:nth-child(1) > div > div:nth-child(1) > a > div > div`,
      (elements) =>
        elements.map((x) => x.querySelector('img')?.getAttribute('src'))
    );

    const scrapeTitle = await page.$$eval(
      `div > div:nth-child(5) > div.flex-1.pb-4.pl-4.pr-4 > div.infinite-scroll-component__outerdiv > div > div:nth-child(1) > div > div:nth-child(1) > a > div > div`,
      (elements) => elements.map((x) => x.querySelector('h5')?.innerText)
    );

    const scrapePrice = await page.$$eval(
      `div > div:nth-child(5) > div.flex-1.pb-4.pl-4.pr-4 > div.infinite-scroll-component__outerdiv > div > div:nth-child(1) > div > div:nth-child(1) > a > div > div.mt-2.products-slider-info-main > div > div > div`,
      (elements) => elements.map((x) => x?.innerHTML)
    );

    const scrapeLink = await page.$$eval(
      `div > div:nth-child(5) > div.flex-1.pb-4.pl-4.pr-4 > div.infinite-scroll-component__outerdiv > div > div:nth-child(1) > div > div:nth-child(1)`,
      (elements) =>
        elements.map((x) => x.querySelector('a')?.getAttribute('href'))
    );

    browser.close();

    const image = scrapeImage.filter((x) => x !== null)[0] as string;
    const title = scrapeTitle.filter((x) => x !== null)[0] as string;
    const price = scrapePrice.filter((x) => x !== null)[0] as string;
    const link = scrapeLink.filter((x) => x !== null)[0] as string;

    scrapeToDiscord(image, title, price, link, client);
  }, 30_000); // interval
};

export default TeknolojiCategory;
