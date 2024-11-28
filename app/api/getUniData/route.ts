import { NextResponse } from 'next/server'
import { combineUniData } from '@/util/combineUniData'


export async function GET() {
  try {
    const uniData = await combineUniData()
    return NextResponse.json(uniData)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to scrape data' }, { status: 500 })
  }
}