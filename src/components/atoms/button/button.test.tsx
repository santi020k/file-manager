import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import Button, { types } from './button'

describe(
  'Button component',
  () => {
    it(
      'renders primary button correctly',
      () => {
        const { getByText } = render(<Button onClick={() => { }} type={types.primary}>Primary Button</Button>)
        const button = getByText('Primary Button')
        expect(button).toBeInTheDocument()
        expect(button.getAttribute('class')).toContain(types.primary)
      }
    )

    it(
      'renders secondary button correctly',
      () => {
        const { getByText } = render(<Button onClick={() => { }} type={types.secondary}>Secondary Button</Button>)
        const button = getByText('Secondary Button')
        expect(button).toBeInTheDocument()
        expect(button.getAttribute('class')).toContain('secondary')
      }
    )

    it(
      'triggers onClick handler',
      () => {
        const onClickMock = vi.fn()
        const { getByText } = render(<Button onClick={onClickMock} type={types.primary}>Click Me</Button>)
        const button = getByText('Click Me')
        fireEvent.click(button)
        expect(onClickMock).toHaveBeenCalled()
      }
    )
  }
)
