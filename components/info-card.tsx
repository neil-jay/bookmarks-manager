import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface InfoCardProps {
  category: string
  name: string
  link: string
}

export function InfoCard({ category, name, link }: InfoCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge>{category}</Badge>
      </CardContent>
      <CardFooter>
        <Link href={link} className="text-blue-500 hover:underline">
          Learn more
        </Link>
      </CardFooter>
    </Card>
  )
}