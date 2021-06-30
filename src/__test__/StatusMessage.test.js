import '@testing-library/jest-dom'

import * as React from 'react'
import { render, screen } from '@testing-library/react'

import StatusMessage from '../components/StatusMessage'

import { STATUS } from '../utils/Const'

test('show correct message', () => {
  let message = 'Carregando...'
  const { rerender } = render(<StatusMessage status={STATUS.loading} />)

  expect(screen.queryByText(message)).not.toBeNull()

  message = 'Erro tente novamente mais tarde...'
  rerender(<StatusMessage status={STATUS.error} />)

  expect(screen.queryByText(message)).not.toBeNull()
})
