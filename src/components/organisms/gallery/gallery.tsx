import React from 'react'

import GalleryCard from '@/components/organisms/gallery-card/gallery-card'

import SectionTitle from '@/atoms/section-title/section-title'

import SkeletonCard from '@/molecules/skeleton-card/skeleton-card'

import useBatchStore from '@/store/use-batch-store'
import useEditStore from '@/store/use-edit-store'
import useUserStore from '@/store/use-user-store'

import { ByOptions, type Media } from '@/hooks/use-media'

import { cn } from '@/lib/utils'

interface GalleryProps {
  onEdit: (media?: Media) => void
  title?: string
  medias?: Media[]
  isLoading: boolean
  byOption: ByOptions
}

const Gallery: React.FC<GalleryProps> = ({ onEdit, title, medias, isLoading, byOption }) => {
  const user = useUserStore(state => state.user)
  const edit = useEditStore(state => state.edit)
  const batch = useBatchStore(state => state.batch)
  const { handleSelected } = useBatchStore(state => state)
  const isEmpty = !medias?.length
  const defaultTitle = 'Private Documents'

  // TODO: Move To new component
  if (isLoading) {
    return (
      <>
        <SectionTitle>
          {title ?? defaultTitle}
        </SectionTitle>

        <div className={cn('grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4', edit.isOpen && 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2')}>
          {[...Array(10)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </>
    )
  }

  // TODO: Move To new component
  if (isEmpty) {
    return (
      <>
        <SectionTitle>
          {title ?? defaultTitle}
        </SectionTitle>

        <div className="p-6">
          <div className="flex w-full flex-col items-center justify-center">
            <h2 className="mb-1 mt-0">No Stored Files!</h2>
            <p className="mb-6">Currently, you don&#39;t have any stored files. Add files to start organizing your content!</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SectionTitle>
        {title ?? defaultTitle}
      </SectionTitle>

      <div className={cn('grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4', edit.isOpen && 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2')}>
        {/* TODO: Move this to new component */}
        {medias?.map(media => {
          const { id, url, name, metadata } = media

          const [
            type,
            format
          ] = metadata.mimetype.split('/')

          return (
            <GalleryCard
              onClick={() => onEdit(media)}
              onSelected={() => handleSelected(`${user?.id}/${byOption}/${name}`)}
              isBatchOpen={batch.isOpen}
              isSelected={!!batch.selected.find(item => item === `${user?.id}/${byOption}/${name}`)}
              key={id}
              description={name}
              file={url}
              format={format}
              type={type}
              className="cursor-pointer"
              footer=""
            />
          )
        })}
      </div>
    </>
  )
}

export default Gallery
