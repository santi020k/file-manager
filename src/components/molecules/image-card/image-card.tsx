import Image from 'next/image'
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
  img: string
  footer?: React.ReactNode
}

const ImageCard: React.FC<CardBuilderProps> = ({ title, description, img, footer }) => (
  <Card>
    <CardContent className="p-0">
      <div className="relative aspect-square h-auto max-w-full">
        <Image fill className="m-0 h-auto max-w-full rounded-t-lg" sizes="100vw" src={img} alt={title || description || 'gallery image'} />
      </div>
    </CardContent>
    <CardHeader>
      {title && <CardTitle className="break-words">{title}</CardTitle>}
      {description && <CardDescription className="m-0 break-words">{description}</CardDescription>}
    </CardHeader>
    {footer && (
      <CardFooter>
        {footer}
      </CardFooter>
    )}
  </Card>
)

export default ImageCard
