import '@testing-library/jest-dom'

import * as React from 'react'
import { render, screen } from '@testing-library/react'

import Rating from '../components/Rating'

test('show correct number of starts', () => {
  const numberOfStarts = 3
  render(<Rating numberOfStars={numberOfStarts} />)

  const numberOfFullStarts = screen.getAllByAltText(
    'ícone de estrela preenchido'
  )

  expect(numberOfFullStarts.length).toBe(numberOfStarts)
})
