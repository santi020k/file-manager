import { IconExternalLink } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/atoms/badge/badge'
import Card, {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/atoms/card/card'
import Checkbox from '@/components/atoms/checkbox/checkbox'

export interface GalleryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  img: string
  footer?: React.ReactNode
}

const GalleryCard: React.FC<GalleryCardProps> = ({ title, description, img, footer, ...restProps }) => (
  <Card {...restProps}>
    <CardContent className="p-0">
      <div className="relative aspect-square h-auto max-w-full">
        {/* TODO: Pending to implement */}
        <Badge variant="secondary" className="absolute left-2 top-2 z-20 cursor-pointer p-2" onClick={event => event.stopPropagation()}>
          <Checkbox />
        </Badge>
        <Image fill className="m-0 h-auto max-w-full rounded-t-lg" sizes="100vw" src={img} alt={title || description || 'gallery image'} />
        <Link href={img} target="_blank" className="cursor-pointer" onClick={event => event.stopPropagation()}>
          <Badge className="absolute right-2 top-2 z-20 p-1">
            <IconExternalLink stroke={1} />
          </Badge>
        </Link>
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

export default GalleryCard
