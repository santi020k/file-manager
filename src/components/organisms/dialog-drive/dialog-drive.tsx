import { IconBrandGoogleDrive } from '@tabler/icons-react'
import Button, { ButtonVariants } from '@/atoms/button/button'
import Dialog, {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/atoms/dialog/dialog'
import useMessages from '@/hooks/use-messages'

const DialogFileUpload = () => {
  const { successMessage } = useMessages()

  const handleGoogleDrive = () => {
    successMessage('Coming soon')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={ButtonVariants.Secondary}>
          Drive
          <IconBrandGoogleDrive stroke={1} size={18} className="ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mt-0">Connect Google Drive</DialogTitle>
          <DialogDescription>
            Link your Google Drive account to our platform using our Google Drive API connection. Enjoy seamless access to your files and documents stored in Google Drive, right from within our application
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Button className="px-3" onClick={handleGoogleDrive}>
              Google Drive
              <IconBrandGoogleDrive stroke={1} size={18} className="ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogFileUpload
