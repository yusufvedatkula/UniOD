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
        const uniInfo = $(this).find('td[data-title="University"] p').text();
        const openDayDate = $(this).find('td[data-title="In-person Open Days"]').text();
        
        // Check if uniInfo is defined before processing
        if (uniInfo) {
            let uniName = uniInfo.split(':')[0];
            let website = uniInfo.split(':')[1]; 
            website = `https://${website ? website.trim() : ''}`; // Ensure website is defined

            uniName = uniName.replace('Source', '');
            openDayDatesList.push({
                uniName: uniName,
                openDayDate: openDayDate ? openDayDate.trim() : '', // Ensure openDayDate is defined
                website: website,
            });
        }
    });
    return openDayDatesList;
}
