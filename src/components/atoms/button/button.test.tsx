import Button from './button'

import { cleanup, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('Button component', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders button with given text', () => {
    const { getByRole } = render(<Button>Click me</Button>)
    const button = getByRole('button', { name: /click me/i })

    expect(button).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', async () => {
    const onClickMock = vi.fn()
    const { getByRole } = render(<Button onClick={onClickMock}>Click me</Button>)
    const button = getByRole('button', { name: /click me/i })

    await userEvent.click(button)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('applies correct className based on variant prop', () => {
    const { getByRole } = render(<Button variant="secondary">Secondary Button</Button>)
    const button = getByRole('button', { name: /secondary button/i })

    expect(button).toHaveClass('bg-secondary')
  })

  it('applies correct className based on size prop', () => {
    const { getByRole } = render(<Button size="lg">Large Button</Button>)
    const button = getByRole('button', { name: /large button/i })

    expect(button).toHaveClass('h-10')
  })
})
