import { memo } from 'react'

import Button, { types } from '@/atoms/button/button'

const GroupButtons = () => {
  const handleClick = () => {
    // Handle click logic here
  }

  return (
    <div>
      <Button onClick={handleClick} type={types.primary}>
        Primary Button
      </Button>
      <Button onClick={handleClick} type={types.secondary}>
        Secondary Button
      </Button>
    </div>
  )
}

export default memo(GroupButtons)
