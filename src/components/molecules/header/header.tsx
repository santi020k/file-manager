'use client'

import { IconBrandGoogleDrive, IconCheckbox, IconFileUpload } from '@tabler/icons-react'
import Image from 'next/image'
import Button from '@/atoms/button/button'
import Separator from '@/atoms/separator/separator'
import SelectedOptions from '@/molecules/selected-options/selected-options'
import useBatchStore from '@/store/useBatchStore'

const Header = () => {
  const batch = useBatchStore(state => state.batch)
  const { toggleBatch } = useBatchStore(state => state)

  return (
    <header className="fixed z-20 w-screen bg-white">
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <div className="relative h-10 w-48">
          <Image className="m-0" fill src="/assets/logos/logo-dark.svg" alt="logo" />
        </div>

        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          {!batch.isOpen && (
            <>
              <Button variant="secondary">
                <IconBrandGoogleDrive stroke={1} size={18} className="mr-1" />
                Drive
              </Button>
              <Button variant="secondary">
                <IconFileUpload stroke={1} size={18} className="mr-1" />
                Upload
              </Button>
            </>
          )}
          {batch.isOpen
            ? (<SelectedOptions onCancel={toggleBatch} />)
            : (
              <Button variant="secondary" onClick={toggleBatch}>
                <IconCheckbox stroke={1} size={18} className="mr-1" />
                Batch
              </Button>
            )}
        </div>
      </div>
      <Separator />
    </header>
  )
}

export default Header
