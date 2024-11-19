import { NextResponse } from 'next/server'
import { techItems } from '@/data/tech-items'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '12', 10)
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || 'All'

  let filteredItems = techItems

  if (category !== 'All') {
    filteredItems = filteredItems.filter(item => item.category === category)
  }

  if (search) {
    filteredItems = filteredItems.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    )
  }

  const totalItems = filteredItems.length
  const totalPages = Math.ceil(totalItems / limit)

  const paginatedItems = filteredItems.slice((page - 1) * limit, page * limit)

  return NextResponse.json({
    items: paginatedItems,
    totalPages,
    currentPage: page,
  })
}