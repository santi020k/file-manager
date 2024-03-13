import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/atoms/dropdown/dropdown'

import DialogConfirm from '@/molecules/dialog-confirm/dialog-confirm'

import Button from '@/components/atoms/button/button'
import { IconTextCaption } from '@tabler/icons-react'

interface SelectedOptionsProps {
  onDelete: () => void
}

const SelectedOptions: React.FC<SelectedOptionsProps> = ({ onDelete }) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="secondary">
        Options
        <IconTextCaption stroke={1} size={18} className="ml-1" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {/* TODO: Maybe i don't have the time to implement this */}
      {/* <DropdownMenuItem>Move</DropdownMenuItem> */}
      <DropdownMenuItem>
        <DialogConfirm onConfirm={onDelete} />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export default SelectedOptions
