import { Card } from '@/components/ui/card'
import { TechItem } from '@/data/tech-items'

export function TechCard({ item }: { item: TechItem }) {
  return (
    <Card className="flex flex-col p-4 sm:p-6 space-y-4">
      <div className="space-y-2">
        <span className="inline-block px-2 py-1 text-xs sm:text-sm font-medium rounded-md bg-primary/10 text-primary">
          {item.category}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold">{item.name}</h3>
        <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
      </div>
      <div className="flex-1 flex items-end">
        <a 
          href={item.link}
          className="inline-flex items-center text-sm sm:text-base text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </Card>
  )
}