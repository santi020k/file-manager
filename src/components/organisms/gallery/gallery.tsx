import SectionTitle from '@/atoms/section-title/section-title'
import GalleryCard from '@/components/organisms/gallery-card/gallery-card'
import { cn } from '@/lib/utils'
import useBatchStore from '@/store/useBatchStore'
import useEditStore from '@/store/useEditStore'

interface GalleryProps {
  onEdit: (id?: number) => void
}

const Gallery: React.FC<GalleryProps> = ({ onEdit }) => {
  const edit = useEditStore(state => state.edit)
  const batch = useBatchStore(state => state.batch)
  const { handleSelected } = useBatchStore(state => state)

  return (
    <>
      <SectionTitle>
        Private Documents
      </SectionTitle>

      <div className={cn(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4',
        edit.isOpen && 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2'
      )}>
        {[...Array(10)].map((_, index) => (
          <GalleryCard
            onClick={() => onEdit(index)}
            onSelected={() => handleSelected(index)}
            isBatchOpen={batch.isOpen}
            isSelected={!!batch.selected.find(item => item === index)}
            key={index}
            description="2018-09-14_LAWS1700_reading-1.pdf"
            img="/assets/placeholders/400x400.png"
            className="cursor-pointer"
            footer=""
          />
        ))}
      </div>
    </>
  )
}

export default Gallery
