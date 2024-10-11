import { NextResponse } from 'next/server'
import scrapeGuardian from '@/util/scrapeGuardian'
import { scrapeUcasCode } from '@/util/scrapeUcasCode'
import { scrapeCUG } from '@/util/scrapeCUG';
import { scrapeODD } from '@/util/scrapeOpenDayDates';

export async function GET() {
  try {
    // const guardianData = await scrapeGuardian();
    // const ucasCodeData = await scrapeUcasCode();
    // const CUG_data = await scrapeCUG();
    const ODD_data = await scrapeODD()
    //console.log(guardianData)
    console.log(ODD_data)
    return NextResponse.json(ODD_data)
  } catch (error) {
    console.error('Error scraping Guardian:', error)
    return NextResponse.json({ error: 'Failed to scrape data' }, { status: 500 })
  }
}