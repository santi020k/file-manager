import SectionTitle from '@/atoms/section-title/section-title'
import GalleryCard from '@/components/organisms/gallery-card/gallery-card'
import { type Media } from '@/hooks/use-media'
import { cn } from '@/lib/utils'
import useBatchStore from '@/store/useBatchStore'
import useEditStore from '@/store/useEditStore'

interface GalleryProps {
  onEdit: (id?: string) => void
  title?: string
  medias?: Media[]
}

const Gallery: React.FC<GalleryProps> = ({ onEdit, title, medias }) => {
  const edit = useEditStore(state => state.edit)
  const batch = useBatchStore(state => state.batch)
  const { handleSelected } = useBatchStore(state => state)

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
        {medias?.map(({ id, url, name, metadata }) => {
          const [
            type,
            format
          ] = metadata.mimetype.split('/')
          return (
            <GalleryCard
              onClick={() => onEdit(id)}
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
