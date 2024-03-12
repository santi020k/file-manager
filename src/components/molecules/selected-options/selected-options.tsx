import { IconDotsCircleHorizontal } from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/atoms/dropdown/dropdown'
import Button from '@/components/atoms/button/button'

interface SelectedOptionsProps {
  onCancel: () => void
}

const SelectedOptions: React.FC<SelectedOptionsProps> = ({ onCancel }) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="secondary">
        <IconDotsCircleHorizontal stroke={1} size={18} className="mr-1" />
        Options
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {/* <DropdownMenuLabel>Move</DropdownMenuLabel>
      <DropdownMenuSeparator /> */}
      <DropdownMenuItem>Move</DropdownMenuItem>
      <DropdownMenuItem>Delete</DropdownMenuItem>
      <DropdownMenuItem onClick={onCancel}>Cancel</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export default SelectedOptions
