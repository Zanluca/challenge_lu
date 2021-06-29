import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import favoriteFull from '../assets/favorito_01.svg'
import favoriteEmpty from '../assets/favorito_02.svg'

const Button = styled.button`
  background-color: transparent;
  border: none;
`

export default function ButtonFavorite({ isFavorite, onClick }) {
  return (
    <Button type="button" onClick={onClick}>
      <img
        src={isFavorite ? favoriteFull : favoriteEmpty}
        alt={`ícone de coração ${isFavorite ? 'preenchido' : 'vazio'}`}
      />
    </Button>
  )
}

ButtonFavorite.propTypes = {
  isFavorite: PropTypes.bool,
  onClick: PropTypes.func
}

ButtonFavorite.defaultProps = {
  isFavorite: false,
  onClick: () => {}
}
