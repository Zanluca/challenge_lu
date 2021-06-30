import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import ratingOff from '../assets/avaliacao_off.svg'
import ratingOn from '../assets/avaliacao_on.svg'

const MAX_STARS = 5

const Container = styled.div`
  display: flex;
  p {
    margin-right: 15px;
  }
`

export default function Rating({ numberOfStars }) {
  const stars = new Array(MAX_STARS).fill('')

  return (
    <Container>
      <p>Rating:</p>
      {stars.map((star, index) => (
        <img
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          src={index >= numberOfStars ? ratingOff : ratingOn}
          alt={`ícone de estrela ${
            index >= numberOfStars ? 'vazio' : 'preenchido'
          }`}
        />
      ))}
    </Container>
  )
}

Rating.propTypes = {
  numberOfStars: PropTypes.number
}

Rating.defaultProps = {
  numberOfStars: 0
}
