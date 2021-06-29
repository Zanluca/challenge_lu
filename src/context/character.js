import React, { useState, createContext } from 'react'

import PropTypes from 'prop-types'

const CharacterContext = createContext({
  favorites: [],
  setFavorites: () => {}
})

export const CharacterProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  const handleFavoriteClick = (characterID) => {
    if (favorites.find((fav) => fav === characterID)) {
      const newFavorites = favorites.filter((fav) => fav !== characterID)
      setFavorites(newFavorites)
    } else {
      if (favorites.length === 5) {
        alert('Você já tem 5 personagens favoritos')
        return
      }
      setFavorites([...favorites, characterID])
    }
  }

  const isFavorite = (characterId) =>
    favorites?.find((fav) => fav === characterId)

  const value = { favorites, setFavorites, handleFavoriteClick, isFavorite }

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterContext

CharacterProvider.propTypes = {
  children: PropTypes.element
}

CharacterProvider.defaultProps = {
  children: null
}
