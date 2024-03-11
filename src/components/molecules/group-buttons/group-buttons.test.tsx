import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import GroupButtons from './group-buttons'

describe(
  'GroupButtons component',
  () => {
    afterEach(() => {
      cleanup()
    })

    it(
      'renders GroupButtons component correctly',
      () => {
        const { getByText } = render(<GroupButtons />)
        const primaryButton = getByText('Primary Button')
        const secondaryButton = getByText('Secondary Button')
        expect(primaryButton).toBeInTheDocument()
        expect(secondaryButton).toBeInTheDocument()
      }
    )

    it(
      'triggers handleClick when buttons are clicked',
      () => {
        const { getByText } = render(<GroupButtons />)
        const primaryButton = getByText('Primary Button')
        const secondaryButton = getByText('Secondary Button')

        const handleClickMock = vi.fn()
        primaryButton.onclick = handleClickMock
        secondaryButton.onclick = handleClickMock

        fireEvent.click(primaryButton)
        fireEvent.click(secondaryButton)

        expect(handleClickMock).toHaveBeenCalledTimes(2)
      }
    )
  }
)
