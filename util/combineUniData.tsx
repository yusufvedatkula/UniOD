import scrapeGuardian from "./scrapeGuardian";
import { scrapeCUG } from "./scrapeCUG";
import { scrapeODD } from "./scrapeOpenDayDates";
import { scrapeUcasCode } from "./scrapeUcasCode";

import { uniDataStructure } from "@/constants";
import { ValidUniversities } from "@/constants";

const normalizeUniversityName = (name: string): string => {
    // Convert name to lowercase for uniformity
    let standardizedName = name.toLowerCase();

    // Map known variations to a single standardized name
    if (standardizedName.includes("london school of economics")) {
        standardizedName = "london school of economics";
    } else if (standardizedName.includes("london school of economics and political science")) {
        standardizedName = "london school of economics";
    }

    if (standardizedName.includes("ucl")) {
        standardizedName = "ucl"
    } else if (standardizedName.includes('university college london')) {
        standardizedName = "ucl"
    }

    if (standardizedName.includes("edinburgh")) {
        standardizedName = "edinburgh"
    }

    standardizedName = standardizedName.replace(/university\s+of\s+/ig, '')
    standardizedName = standardizedName.replace(/university/ig, '');
    standardizedName = standardizedName.replace(/london/ig, '')
    standardizedName = standardizedName.replace(/[^\w\s]/gi, '') 
    standardizedName = standardizedName.trim();
    return standardizedName
    
};



export const combineUniData = async () => {
    // Use ValidUniversities to populate universityData
    const universityData: uniDataStructure[] = ValidUniversities.map(uniName => ({
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
                rank: guardianInfo ? guardianInfo.rank : "N/A",
                score: guardianInfo ? guardianInfo.score : "N/A",
                satisfiedWithTeaching: guardianInfo ? guardianInfo.satisfiedWithTeaching : "N/A",
                careerAfter15Months: guardianInfo ? guardianInfo.careerAfter15Months : "N/A",
            },
            CompleteUniversityGuideData: {
                rank: CUGInfo ? CUGInfo.rank : "N/A",
                score: CUGInfo ? CUGInfo.score : "N/A",
                studentSatisfaction: CUGInfo ? CUGInfo.studentSatisfaction : "N/A",
                researchQuailty: CUGInfo ? CUGInfo.researchQuailty : "N/A",
                graduateProspects: CUGInfo ? CUGInfo.graduateProspects : "N/A",
            },
            openDayDate: openDayDates ? openDayDates.openDayDate : "N/A",
            ucasCode: ucasCode ? ucasCode.ucasCode : "N/A",
            website: openDayDates ? openDayDates.website : "N/A",
        } as uniDataStructure; // Ensure the return type is correctly asserted
    }).filter(uni => ValidUniversities.includes(uni.uniName));

    return combinedData;
}
