import { IconFileUpload } from '@tabler/icons-react'
import Button, { ButtonVariants } from '@/atoms/button/button'
import Dialog, {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/atoms/dialog/dialog'
import Input from '@/atoms/input/input'
import Label from '@/atoms/label/label'

const DialogFileUpload = () => {
  async function uploadImage (event: React.ChangeEvent<HTMLInputElement>) {
    // TODO: Process logic pending
    const file = event?.target?.files?.[0]
    console.log(
      '🚀 ~ uploadImage ~ file:',
      event,
      file
    )

    // const { data, error } = await supabase
    //   .storage
    //   .from('uploads')
    //   .upload(
    //     userId + '/' + uuidv4(),
    //     file
    //   )

    // if (data) {
    //   getMedia()
    // } else {
    //   console.log(error)
    // }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={ButtonVariants.Secondary}>
          Upload
          <IconFileUpload stroke={1} size={18} className="ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mt-0">Upload File</DialogTitle>
          <DialogDescription>
            Quickly and easily upload files with our intuitive upload file ui/infrastructure. Simply select your files, and they&#39;ll be ready to go in no time
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="upload" className="sr-only">
              Upload
            </Label>
            <Input
              id="upload"
              type="file"
              onChange={uploadImage}
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Upload</span>
            <IconFileUpload stroke={1} size={18} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogFileUpload
