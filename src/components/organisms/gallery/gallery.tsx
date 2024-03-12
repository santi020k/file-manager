import SectionTitle from '@/atoms/section-title/section-title'
import ImageCard from '@/components/organisms/gallery-card/gallery-card'
import useBatchStore from '@/store/useBatchStore'

interface GalleryProps {
  onEdit: (id?: number) => void
}

const Gallery: React.FC<GalleryProps> = ({ onEdit }) => {
  const batch = useBatchStore(state => state.batch)
  const { handleSelected } = useBatchStore(state => state)

  return (
    <>
      <SectionTitle>
      Private Documents
      </SectionTitle>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {[...Array(10)].map((_, index) => (
          <ImageCard
            onClick={() => onEdit(index)}
            onSelected={() => handleSelected(index)}
            isBatchOpen={batch.isOpen}
            isSelected={!!batch.selected.find(item => item === index)}
            key={index}
            description="2018-09-14_LAWS1700_reading-1.pdf"
            img="/assets/placeholders/400x400.png"
            footer=""
          />
        ))}
      </div>
    </>
  )
}

export default Gallery
