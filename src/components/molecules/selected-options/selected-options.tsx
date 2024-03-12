import { IconTextCaption } from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/atoms/dropdown/dropdown'
import Button from '@/components/atoms/button/button'

interface SelectedOptionsProps {}

const SelectedOptions: React.FC<SelectedOptionsProps> = () => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="secondary">
        Options
        <IconTextCaption stroke={1} size={18} className="ml-1" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Move</DropdownMenuItem>
      <DropdownMenuItem>Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export default SelectedOptions
