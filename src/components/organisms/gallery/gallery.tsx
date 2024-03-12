import SectionTitle from '@/atoms/section-title/section-title'
import ImageCard from '@/components/organisms/gallery-card/gallery-card'

interface GalleryProps {
  onSelect: (id?: number) => void
}

const Gallery: React.FC<GalleryProps> = ({ onSelect }) => (
  <>
    <SectionTitle>
      Private Documents
    </SectionTitle>

    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {[...Array(10)].map((_, index) => (
        <ImageCard
          onClick={() => onSelect(index)}
          key={index}
          description="2018-09-14_LAWS1700_reading-1.pdf"
          img="/assets/placeholders/400x400.png"
          footer=""
        />
      ))}
    </div>
  </>
)

export default Gallery
