import * as cheerio from 'cheerio'
import axios from 'axios'

//websites to scrape from
import { websites } from '../constants';

import { OpenDayDatesDataStructure } from '../constants';

export const scrapeODD = async () => {
    const response3 = await axios.get(websites.OpenDaysURL);
    const html = response3.data;
    const $ = cheerio.load(html);
    const openDayDatesList:OpenDayDatesDataStructure[] = [];

    $('table tr').each(function () {
        const uniInfo = $(this).find('td[data-title="University"] p').text().trim();
        const openDayDate = $(this).find('td[data-title="In-person Open Days"]').text().trim();
        let uniName = uniInfo.split(':')[0]
        const website = uniInfo.split(':')[1]

        uniName = uniName.replace('Source', '')
        openDayDatesList.push({
            uniName: uniName,
            openDayDate: openDayDate,
            website: website,
        });
    });
    return openDayDatesList
}

