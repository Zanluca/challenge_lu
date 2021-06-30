import '@testing-library/jest-dom'

import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import ButtonFavorite from '../components/ButtonFavorite'

test('show isFavorite correctly and call onClick', () => {
  let isFavorite = true
  const handleClick = jest.fn()
  const { rerender } = render(
    <ButtonFavorite isFavorite={isFavorite} onClick={handleClick} />
  )
  const button = screen.getByAltText('ícone de coração preenchido')
  expect(button).not.toBeNull()

  fireEvent.click(button)
  expect(handleClick).toHaveBeenCalledTimes(1)

  isFavorite = false
  rerender(<ButtonFavorite isFavorite={isFavorite} onClick={handleClick} />)

  expect(screen.getByAltText('ícone de coração vazio')).not.toBeNull()
})
