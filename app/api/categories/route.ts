import { NextResponse } from 'next/server'
import { techItems } from '@/data/tech-items'

export async function GET() {
  const categories = [...new Set(techItems.map(item => item.category))]
  return NextResponse.json(categories)
}