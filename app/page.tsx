'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { TechCard } from '@/components/TechCard'
import { CategoryFilters } from '@/components/CategoryFilters'
import { Pagination } from '@/components/Pagination'
import { TechItem } from '@/data/tech-items'
import { useDebounce } from '@/hooks/useDebounce'

const ITEMS_PER_PAGE = 12

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [items, setItems] = useState<TechItem[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState<string[]>([])

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(['All', ...data])
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(`/api/tech-items?page=${currentPage}&limit=${ITEMS_PER_PAGE}&search=${debouncedSearchTerm}&category=${selectedCategory}`)
      const data = await res.json()
      setItems(data.items)
      setTotalPages(data.totalPages)
    }

    fetchItems()
  }, [currentPage, debouncedSearchTerm, selectedCategory])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    window.scrollTo(0, 0)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col items-center text-center gap-2 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Welcome to My Website</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
          Explore our comprehensive technology stack and learn more about the tools we use.
        </p>
      </div>
      <div className="space-y-4 flex flex-col items-center">
        <Input
          type="text"
          placeholder="Search technologies..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="w-full max-w-md"
        />
        <CategoryFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, index) => (
          <TechCard key={index} item={item} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}