import * as cheerio from 'cheerio'
import axios from 'axios'

//websites to scrape from
import { websites } from '../constants';

// Import guardianDataStructure from constants
import { guardianDataStructure } from '../constants';


const scrapeGuardian = async () => {
    const response = await axios.get(websites.guardian);
        const html = response.data;
        const $ = cheerio.load(html);
        const guardianData: guardianDataStructure[] = [];

        const ranks: string[] = [];
        const uniNames: string[] = [];
        const scores: string[] = [];
        const satisfiedWithTeaching: string[] = [];
        const averageEntryTariff: string[] = [];
        const careerAfter15Months: string[] = [];

        $('.c-table__data--1').each(function () {
            const rank = $(this).text().trim();
            ranks.push(rank);
        });

        $('.c-table__institution-link').each(function () {
            const uniName = $(this).text().trim();
            uniNames.push(uniName);
        });

        $('.c-table__data--4').each(function () {
            const score = $(this).text().trim();
            scores.push(score);
        });

        $('.c-table__data--5').each(function () {
            const satisfiedWithTeachingScore = $(this).text().trim();
            satisfiedWithTeaching.push(satisfiedWithTeachingScore);
        });

        $('.c-table__data--9').each(function () {
            const averageEntryTariffScore = $(this).text().trim();
            averageEntryTariff.push(averageEntryTariffScore);
        });

        $('.c-table__data--11').each(function () {
            const careerAfter15MonthsScore = $(this).text().trim();
            careerAfter15Months.push(careerAfter15MonthsScore);
        });

        for (let i = 0; i < ranks.length; i++) {
            guardianData.push({
                rank: parseInt(ranks[i]),
                uniName: uniNames[i],
                score: parseInt(scores[i]),
                satisfiedWithTeaching: parseInt(satisfiedWithTeaching[i]),
                averageEntryTariff: parseInt(averageEntryTariff[i]),
                careerAfter15Months: parseInt(careerAfter15Months[i])
            });
        }
        

        return guardianData
    }

export default scrapeGuardian;