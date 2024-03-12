import SectionTitle from '@/atoms/section-title/section-title'
import ImageCard from '@/molecules/image-card/image-card'

const Gallery = () => (
  <>
    <SectionTitle>
      Private Documents
    </SectionTitle>

    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {[...Array(10)].map((_, index) => (
        <ImageCard
          key={index}
          // title="test"
          description="2018-09-14_LAWS1700_reading-1.pdf"
          img="/assets/placeholders/400x400.png"
          footer=""
        />
      ))}
    </div>
  </>
)

export default Gallery
