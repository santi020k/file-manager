import { IconBrandGoogleDrive, IconCheckbox, IconFileUpload } from '@tabler/icons-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Button from '@/atoms/button/button'
import Gallery from '@/atoms/gallery/gallery'
import Separator from '@/atoms/separator/separator'

export const metadata: Metadata = {
  title: 'Playground',
  description: 'The OpenAI Playground built using the components.'
}

const Dashboard = () => (
  <main className="flex h-screen max-h-screen flex-col">
    {/* Header */}
    <header className='fixed z-20 w-screen bg-white'>
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <div className="">
          <div className="relative h-10 w-48">
            <Image className="m-0" fill src="/assets/logos/logo-dark.svg" alt="logo" />
          </div>
        </div>
        {/* TODO: Process */}
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          <Button variant="secondary">
            <IconCheckbox stroke={1} size={18} className='mr-1' />
              Batch
          </Button>
          <Button variant="secondary">
            <IconBrandGoogleDrive stroke={1} size={18} className='mr-1' />
              Drive
          </Button>
          <Button variant="secondary">
            <IconFileUpload stroke={1} size={18} className='mr-1' />
              Upload
          </Button>
        </div>
      </div>
      <Separator />
    </header>

    <div defaultValue="complete" className="flex-1">
      <div className="container h-full py-6">
        <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
          {/* Sidebar */}
          <aside className="flex flex-col space-y-4 md:order-2">
            <div className="grid gap-2">
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Edit
              </span>
              {/* TODO: Form for edit here */}
            </div>
          </aside>

          {/* Content */}
          <section className="md:order-1">
            <div className="mt-0 border-0 p-0">
              <Gallery />
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
)

export default Dashboard
