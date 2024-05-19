import React from 'react'

import Card, {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/atoms/card/card'

export interface CardBuilderProps {
  title?: string
  description?: string
  content: React.ReactNode
  footer?: React.ReactNode
}

const BasicCard: React.FC<CardBuilderProps> = ({ title, description, content, footer }) => (
  <Card>
    <CardHeader>
      {title && <CardTitle>{title}</CardTitle>}
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>
      {content}
    </CardContent>
    <CardFooter>
      {footer}
    </CardFooter>
  </Card>
)

export default BasicCard
