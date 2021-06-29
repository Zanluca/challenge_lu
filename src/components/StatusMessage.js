import React from 'react'
import PropTypes from 'prop-types'

import { STATUS } from '../utils/Const'

export default function StatusMessage({ status }) {
  return (
    <div>
      {status === STATUS.loading && 'Carregando...'}
      {status === STATUS.error && 'Erro tente novamente mais tarde...'}
    </div>
  )
}

StatusMessage.propTypes = {
  status: PropTypes.oneOf([STATUS.loading, STATUS.loading])
}

StatusMessage.defaultProps = {
  status: STATUS.loading
}
