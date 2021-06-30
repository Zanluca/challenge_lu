import '@testing-library/jest-dom'

import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import PaginationButton from '../components/PaginationButton'

test('call next and previous click and display page number correctly', () => {
  const handlePreviousClick = jest.fn()
  const handleNextClick = jest.fn()
  let page = 1
  const { rerender } = render(
    <PaginationButton
      page={page}
      nextClick={handleNextClick}
      prevClick={handlePreviousClick}
    />
  )
  const buttonPrevious = screen.getByText('<')
  const buttonNext = screen.getByText('>')

  let pageText = screen.getByText(page)
  expect(pageText).not.toBeNull()

  fireEvent.click(buttonNext)
  expect(handleNextClick).toHaveBeenCalledTimes(1)

  page = 2

  rerender(
    <PaginationButton
      page={page}
      nextClick={handleNextClick}
      prevClick={handlePreviousClick}
    />
  )

  pageText = screen.getByText(page)
  expect(pageText).not.toBeNull()

  fireEvent.click(buttonPrevious)
  expect(handlePreviousClick).toHaveBeenCalledTimes(1)
})
