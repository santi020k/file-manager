import React from 'react'

import Button, { ButtonVariants } from '@/atoms/button/button'
import Dialog, {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/atoms/dialog/dialog'
import { IconTrash } from '@tabler/icons-react'

interface DialogConfirmProps {
  onConfirm: () => void
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({ onConfirm }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant={ButtonVariants.Destructive}>
        Delete
        <IconTrash stroke={1} size={18} className="ml-1" />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Deleting Multimedia Assets</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the selected multimedia assets?
          This action cannot be undone. Please ensure that you have selected the correct assets before proceeding
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-end">
        <DialogClose asChild>
          <Button type="button" variant={ButtonVariants.Secondary}>
            Close
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" variant={ButtonVariants.Destructive} onClick={onConfirm}>
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export default DialogConfirm
