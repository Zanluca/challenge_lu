import React, { useState, createContext, useEffect } from 'react'

import PropTypes from 'prop-types'

const CharacterContext = createContext({
  favorites: [],
  setFavorites: () => {}
})

export const CharacterProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const storage = localStorage.getItem('favorites')
    if (storage) {
      const parse = JSON.parse(storage)
      if (Array.isArray(parse)) {
        const favoritesStorage = parse.slice(0, 5)
        setFavorites(favoritesStorage)
      }
    }
  }, [])

  const handleFavoriteClick = (characterID) => {
    if (favorites.find((fav) => fav === characterID)) {
      const newFavorites = favorites.filter((fav) => fav !== characterID)
      setFavorites(newFavorites)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    } else {
      if (favorites.length === 5) {
        // eslint-disable-next-line
        alert('Você já tem 5 personagens favoritos')
        return
      }
      setFavorites([...favorites, characterID])
      localStorage.setItem(
        'favorites',
        JSON.stringify([...favorites, characterID])
      )
    }
  }

  const isFavorite = (characterId) =>
    !!favorites?.find((fav) => fav === characterId)

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
