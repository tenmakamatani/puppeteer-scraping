import * as puppeteer from 'puppeteer';
import { splitTeachers } from './utils';

import { Lecture } from './types';

const main = async (url: string) => {
  // Setup puppeteer
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();

  // Get faculties
  await page.goto(url, { waitUntil: 'load' }).catch(e => { console.log(e)});
  let selector = '#listing > dd > a';
  const facultyLinks = await page.$$eval(selector, (items: any) => {
    return items.map((item) => {
      return {
        href: item.href,
        textContent: item.textContent
      }
    });
  });

  // Get departments of each faculties
  for (let facultyLink of facultyLinks) {
    // Get departments
    await page.goto(facultyLink.href, { waitUntil: ['load', 'networkidle2'] }).catch(e => { console.log(e) });
    const departmentLinks = await page.$$eval(selector, (items: any) => {
      return items.map((item) => {
        return {
          href: item.href,
          textContent: item.textContent
        }
      });
    });

    // Get lectures of each departments
    for (let departmentLink of departmentLinks) {
      await page.goto(departmentLink.href, { waitUntil: 'load' }).catch(e => { console.log(e) });
      const lectureLinks = await page.$$eval(selector, (items: any) => {
        return items.map((item) => {
          return {
            href: item.href,
            textContent: item.textContent
          }
        });
      });

      // Get property of each lectures
      for (let lectureLink of lectureLinks) {
        await page.goto(lectureLink.href, { waitUntil: 'load' }).catch(e => { console.log(e) });

        // Get lecture information
        const lecture: Lecture = {} as Lecture;
        const propertySelector = 'table#course-content > tbody > tr > td';
        const properties = await page.$$eval(propertySelector, (items: any) => {
          return items.map((item) => {
            return {
              content: item.textContent
            }
          });
        });
        lecture['title'] = lectureLink.textContent;
        lecture['semester'] = properties[5].content;
        lecture['year'] = 2019;
        lecture['teachers'] = splitTeachers(properties[17].content);
        lecture['dayAndPeriodTimes'] = properties[15].content;
        lecture['faculties'] = [facultyLink.textContent];
        console.log(lecture);
      };

    };

  };
}

main('https://ocw.kyoto-u.ac.jp/syllabuses2019').catch(e => console.log(e));
