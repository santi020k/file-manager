import SectionTitle from '@/atoms/section-title/section-title'
import GalleryCard from '@/components/organisms/gallery-card/gallery-card'
import { type Media } from '@/hooks/use-media'
import { cn } from '@/lib/utils'
import SkeletonCard from '@/molecules/skeleton-card/skeleton-card'
import useBatchStore from '@/store/useBatchStore'
import useEditStore from '@/store/useEditStore'

interface GalleryProps {
  onEdit: (media?: Media) => void
  title?: string
  medias?: Media[]
  isLoading: boolean
}

const Gallery: React.FC<GalleryProps> = ({ onEdit, title, medias, isLoading }) => {
  const edit = useEditStore(state => state.edit)
  const batch = useBatchStore(state => state.batch)
  const { handleSelected } = useBatchStore(state => state)

  const isEmpty = !medias?.length

  // TODO: Move To new component
  if (isLoading) {
    return (
      <>
        <SectionTitle>
          {title ?? 'Private Documents'}
        </SectionTitle>

        <div className={cn(
          'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4',
          edit.isOpen && 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2'
        )}>
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
          {title ?? 'Private Documents'}
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
        {title ?? 'Private Documents'}
      </SectionTitle>

      <div className={cn(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4',
        edit.isOpen && 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2'
      )}>
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
              onSelected={() => handleSelected(id)}
              isBatchOpen={batch.isOpen}
              isSelected={!!batch.selected.find(item => item === id)}
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
