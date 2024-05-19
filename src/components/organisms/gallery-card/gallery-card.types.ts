import React from 'react'

export interface GalleryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  file: string
  footer?: React.ReactNode
  isSelected: boolean
  isBatchOpen: boolean
  format: string
  type: string
  onSelected: () => void
}
