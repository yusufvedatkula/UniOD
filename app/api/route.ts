import { NextResponse } from 'next/server'
import scrapeGuardian from '@/util/scrapeGuardian'


export async function GET() {
  try {
    const guardianData = await scrapeGuardian();
    console.log(guardianData)
    return NextResponse.json(guardianData)
  } catch (error) {
    console.error('Error scraping Guardian:', error)
    return NextResponse.json({ error: 'Failed to scrape data' }, { status: 500 })
  }
}