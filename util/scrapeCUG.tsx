import * as cheerio from 'cheerio'
import axios from 'axios'

//websites to scrape from
import { websites } from '../constants';

// Import guardianDataStructure from constants
import { CompleteUniversityGuideDataStructure } from '../constants';

export const scrapeCUG = async () => {
    const response = await axios.get(websites.completeUniversityGuideURL)
    const html = response.data
    const $ = cheerio.load(html)
    const CompleteUniversityGuideData: CompleteUniversityGuideDataStructure[] = []
    
    const rankList:string[] = []
    const uniNameList:string[] = []
    let scorelist:string[] = []
    let studentSatisfactionList:string[] = []
    let researchQuailtyList:string[] = []
    let graduateProspectsList:string[] = []

    $('.uninum').each(function() {
        const rank = $(this).text().replace('/=/g', '')
        rankList.push(rank)
    })

    $('.uni_lnk').each(function() {
        const uniName = $(this).text();
        uniNameList.push(uniName)
    })

    $('.rt_list1 div div span').each(function() {
        const score = $(this).text()
        scorelist.push(score)
    })

    scorelist = scorelist.filter(item => item !== 'Overall score' && item !== '');
    scorelist = scorelist.map(item => item.replace('%', ''));

    $('.rt_list3 div div span').each(function() {
        const studentSatisfaction = $(this).text()
        studentSatisfactionList.push(studentSatisfaction)
    })

    studentSatisfactionList = studentSatisfactionList.filter(item => item !== 'Student satisfaction' && item !== '');
    studentSatisfactionList = studentSatisfactionList.map(item => item.replace('%', ''));

    $('.rt_list4 div div span').each(function() {
        const researchQuailty = $(this).text()
        researchQuailtyList.push(researchQuailty)
    })

    researchQuailtyList = researchQuailtyList.filter(item => item !== 'Research quality' && item !== '')
    researchQuailtyList = researchQuailtyList.map(item => item.replace('%', ''))
    
    $('.rt_list6 div div span').each(function() {
        const graduateProspects = $(this).text()
        graduateProspectsList.push(graduateProspects)
    })

    graduateProspectsList = graduateProspectsList.filter(item => item !== 'Graduate prospects' && item !== '')
    graduateProspectsList = graduateProspectsList.map(item => item.replace('%', ''))

    for (let i = 0; i < rankList.length; i++) {
        CompleteUniversityGuideData.push({
            rank: parseInt(rankList[i]),
            uniName: uniNameList[i],
            score: parseInt(scorelist[i]),
            studentSatisfaction: parseInt(studentSatisfactionList[i]),
            researchQuailty: parseInt(researchQuailtyList[i]),
            graduateProspects: parseInt(graduateProspectsList[i])
        });
    }

    return (CompleteUniversityGuideData)

}