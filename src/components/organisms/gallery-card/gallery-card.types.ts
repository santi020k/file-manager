export interface GalleryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  img: string
  footer?: React.ReactNode
  isSelected: boolean
  isBatchOpen: boolean
  onSelected: () => void
}
