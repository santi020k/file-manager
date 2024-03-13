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

import { type GalleryCardProps } from './gallery-card.types'

const GalleryCard: React.FC<GalleryCardProps> = ({
  title, description, file, footer, onSelected, isSelected, isBatchOpen, format, type, onClick, ...restProps
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isBatchOpen) {
      onSelected()
    } else {
      onClick?.(event)
    }
  }

  return (
    <Card onClick={handleClick} {...restProps}>
      <CardContent className="border-b p-0">
        <div className="relative aspect-square h-auto max-w-full">
          {/* TODO: Pending to implement */}
          {isBatchOpen && (
            <Badge variant="secondary" className="absolute left-2 top-2 z-20 cursor-pointer p-2" onClick={handleClick}>
              <Checkbox checked={isSelected} />
            </Badge>
          )}
          {type === 'image'
            ? (
              <Image fill className="m-0 h-auto max-w-full rounded-t-sm object-cover object-center" sizes="320px" src={file} alt={title || description || 'gallery image'} />
            )
            : (
              <h4 className="m-0 flex h-full max-w-full items-center justify-center rounded-t-sm bg-[#76ABAE] text-6xl text-white">{format.toUpperCase()}</h4>
            )}
          <Link href={file} target="_blank" className="cursor-pointer" onClick={event => event.stopPropagation()}>
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
}

export default GalleryCard

export { type GalleryCardProps }
