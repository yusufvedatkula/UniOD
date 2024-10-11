import * as cheerio from 'cheerio'
import axios from 'axios'

//websites to scrape from
import { websites } from '../constants';

import { ucasCodeDataStructure } from '../constants';

export const scrapeUcasCode = async () => {
    const response = await axios.get(websites.ucasCodeURL);
    const html = response.data;
    const $ = cheerio.load(html);
    let ucasCodeData: ucasCodeDataStructure[] = [];

    const ucasCodes: string[] = [];
    const uniNames: string[] = [];

    $('.mw-content-ltr ul li').each(function () {
        const row = $(this).text();
        const info = row.split(" ");
        info.pop();

        const uniName = info.slice(1).join(" ");
        const ucasCode = info[0];

        ucasCodes.push(ucasCode);
        uniNames.push(uniName);
    });

    for (let i = 0; i < ucasCodes.length; i++) {
        ucasCodeData.push({
            uniName: uniNames[i],
            ucasCode: ucasCodes[i]
        });
    }
    ucasCodeData = ucasCodeData.filter(uni => uni.uniName !== "") 
    return ucasCodeData;
};