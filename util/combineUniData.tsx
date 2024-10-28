import scrapeGuardian from "./scrapeGuardian";
import { scrapeCUG } from "./scrapeCUG";
import { scrapeODD } from "./scrapeOpenDayDates";
import { scrapeUcasCode } from "./scrapeUcasCode";

import { uniData } from "@/constants";
import { ValidUniversities } from "@/constants";

const normalizeUniversityName = (name: string): string => {
    // Convert name to lowercase, remove 'University of' and 'University', and trim any extra whitespace
    return name.toLowerCase()
               .replace(/^university of\s+/i, '') // Remove 'University of' at the start
               .replace(/^university\s+/i, '')     // Remove 'University' at the start
               .trim()                             // Trim any extra spaces
               .replace(/[^\w\s]/gi, '');         // Remove non-word characters
};


export const combineUniData = async () => {
    // Use ValidUniversities to populate universityData
    const universityData: uniData[] = ValidUniversities.map(uniName => ({
        uniName,
        guardianData: { rank: null, 
            score: null, 
            satisfiedWithTeaching: null, 
            careerAfter15Months: null },
        CompleteUniversityGuideData: { rank: null, 
            score: null, 
            studentSatisfaction: null, 
            researchQuailty: null, 
            graduateProspects: null },
        openDayDate: null,
        ucasCode: null,
        website: null,
    }));

    const guardianData = await scrapeGuardian()
    const CompleteUniversityGuideData = await scrapeCUG()
    const openDayDatesData = await scrapeODD()
    const ucasCodes = await scrapeUcasCode()

    const combinedData = universityData.map(uni => {
        const normalizedUniName = normalizeUniversityName(uni.uniName);
        const guardianInfo = guardianData.find(guardian => normalizeUniversityName(guardian.uniName) === normalizedUniName);
        const CUGInfo = CompleteUniversityGuideData.find(CUG => normalizeUniversityName(CUG.uniName) === normalizedUniName);
        const openDayDates = openDayDatesData.find(odd => normalizeUniversityName(odd.uniName) === normalizedUniName);
        const ucasCode = ucasCodes.find(code => normalizeUniversityName(code.uniName) === normalizedUniName);
        return {
            ...uni,
            uniName: uni.uniName,
            guardianData: {
                rank: guardianInfo ? guardianInfo.rank : null,
                score: guardianInfo ? guardianInfo.score : null,
                satisfiedWithTeaching: guardianInfo ? guardianInfo.satisfiedWithTeaching : null,
                careerAfter15Months: guardianInfo ? guardianInfo.careerAfter15Months : null,
            },
            CompleteUniversityGuideData: {
                rank: CUGInfo ? CUGInfo.rank : null,
                score: CUGInfo ? CUGInfo.score : null,
                studentSatisfaction: CUGInfo ? CUGInfo.studentSatisfaction : null,
                researchQuailty: CUGInfo ? CUGInfo.researchQuailty : null,
                graduateProspects: CUGInfo ? CUGInfo.graduateProspects : null,
            },
            openDayDate: openDayDates ? openDayDates.openDayDate : null,
            ucasCode: ucasCode ? ucasCode.ucasCode : null,
            website: openDayDates ? openDayDates.website : null,
        } as uniData; // Ensure the return type is correctly asserted
    }).filter(uni => ValidUniversities.includes(uni.uniName));

    return combinedData;
}
