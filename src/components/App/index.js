import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import { CharacterProvider } from '../../context/character'

import Routes from '../../routes'

function App() {
  return (
    <BrowserRouter>
      <CharacterProvider>
        <Routes />
      </CharacterProvider>
    </BrowserRouter>
  )
}

export default App
