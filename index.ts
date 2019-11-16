import * as puppeteer from 'puppeteer';

const main = async (url: string) => {
  // Setup puppeteer
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();

  // Setup selector string
  let selector: string;

  // Get faculities
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  selector = '#listing > dd > a';
  const faculities = await page.$$eval(selector, (items: any) => {
    let data = [];
    items.forEach((item) => {
      data.push({
        href: item.href,
        textContent: item.textContent,
        innerHTML: item.innerHTML
      });
    });
    return data;
  });

  // Get department of each faculities
  faculities.forEach(async (faculity) => {
    await page.goto(faculity.href, { waitUntil: 'domcontentloaded' });
    try {
      const departments = await page.$$eval(selector, (items: any) => {
        return items.map((item) => {
          return {
            href: item.href,
            textContent: item.textContent,
            innerHTML: item.innerHTML
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  });
}

main('https://ocw.kyoto-u.ac.jp/syllabuses2019');
