import Image from 'next/image'

const gallery = () => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
    {[...Array(10)].map((_, index) => (
      <div key={index} className='relative aspect-square h-auto max-w-full rounded-lg'>
        <Image fill className="m-0 h-auto max-w-full rounded-lg" sizes='100vw' src="/assets/placeholders/400x400.png" alt="placeholder"/>
      </div>
    ))}
  </div>
)

export default gallery
