import Skeleton from '@/atoms/skeleton/skeleton'

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[226px] w-full rounded-xl" />
      <div className="space-y-2 p-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}

export default SkeletonCard
