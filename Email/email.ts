import pkg from 'nodemailer';
const nodemailer = pkg;

import { uniDataStructure } from "@/constants";

function convertEmail(openDayDate: string, uni_name: string, email: string, uniData:uniDataStructure, user_name:string) {
    const mailOptions = {
        from: email,
        to: 'yvk1710@gmail.com',
        subject: `UniOD: Hey ${user_name} Don't forget  your ${uni_name} Open Day!`,
        text: `${uni_name} open day is on ${openDayDate}
        Here is the data about ${uni_name}:
        CUG RANK: ${uniData.CompleteUniversityGuideData?.rank}
        Guardian Rank: ${uniData.guardianData?.rank}
        CUG score: ${uniData.CompleteUniversityGuideData?.score}
        Guardian score: ${uniData.guardianData?.score}
        Satisfied with teaching: ${uniData.guardianData?.satisfiedWithTeaching}
        Career After 15 months: ${uniData.guardianData?.careerAfter15Months}
        Student Satisfaction: ${uniData.CompleteUniversityGuideData?.studentSatisfaction}
        Research Quality: ${uniData.CompleteUniversityGuideData?.researchQuailty}
        Graduate Prospects: ${uniData.CompleteUniversityGuideData?.graduateProspects}
        Website: ${uniData.website}
        `,
    };

    return mailOptions
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tg119278@gmail.com',
        pass: (process.env.EMAIL_PASSWORD),
    },
});

export { convertEmail, transporter }

