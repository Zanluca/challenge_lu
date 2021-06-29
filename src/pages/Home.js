import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { useHistory, useParams, Link } from 'react-router-dom'

import logo from '../assets/logo.svg'
import hero from '../assets/ic_heroi.svg'
import favoriteFull from '../assets/favorito_01.svg'
import toggleOff from '../assets/toggle_off.svg'
import toggleOn from '../assets/toggle_on.svg'

import { IMAGE_VARIANT, STATUS } from '../utils/Const'

import useDebounce from '../hooks/use-debounce'

import SearchInput from '../components/SearchInput'
import Container from '../components/Container'
import Footer from '../components/Footer'
import ButtonFavorite from '../components/ButtonFavorite'
import StatusMessage from '../components/StatusMessage'

import Characters from '../service/characters'

import CharacterContext from '../context/character'

const Header = styled.header`
  text-align: center;

  h1 {
    text-transform: uppercase;
    font-weight: bold;
    color: #404040;
  }
  p {
    color: #8c8c8c;
  }
`

const InfoContainer = styled.div`
  justify-content: space-between;
  /* background-color: yellow; */
  width: 80%;
  display: flex;
  align-items: center;
  color: #b9b9b9;
  font-weight: 600;
  font-size: 1.05em;
`

const Main = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
  flex-direction: column;
  align-items: center;
`

const FiltersContainer = styled.div`
  justify-content: space-between;
  width: 45%;
  display: flex;
  align-items: center;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  color: #fa8484;
  font-weight: bold;
  cursor: pointer;
  img {
    margin: 0px 15px;
  }

  :focus {
    border: none;
  }
`

const ListCharacters = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  margin-top: 50px;

  li {
    display: flex;
    flex-direction: column;
  }

  li > img {
    max-width: 250px;
    border-bottom: 5px solid red;
  }

  li div {
    margin-top: 10px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    max-width: 250px;
  }

  div button {
    background-color: transparent;
    border: none;
  }

  a:hover,
  a:visited,
  a:link,
  a:active {
    text-decoration: none;
  }
  a {
    color: inherit;
  }
`

export default function Home() {
  const [data, setData] = useState([])
  const history = useHistory()
  const [isOrderByName, setIsOrderByName] = useState(true)
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [status, setStatus] = useState(STATUS.loading)

  const { startsWith } = useParams()
  const debounceSearchTerm = useDebounce(startsWith, 500)
  const [searchName, setSearchName] = useState(startsWith)

  const { handleFavoriteClick, isFavorite, favorites } =
    useContext(CharacterContext)

  const getData = async () => {
    setStatus(STATUS.loading)
    const paylod = {
      nameStartsWith: debounceSearchTerm,
      orderByName: isOrderByName
    }
    const character = await Characters.getCharacters(paylod)
    if (character === STATUS.error) {
      setStatus(STATUS.error)
      return
    }

    setData(character)
    setOnlyFavorites(false)
    setStatus(STATUS.success)
  }

  useEffect(() => {
    if (!onlyFavorites) getData()
  }, [debounceSearchTerm, isOrderByName])

  const handleOnlyFavoriteClick = async () => {
    setStatus(STATUS.loading)
    if (!onlyFavorites) {
      setOnlyFavorites(true)
      const requests = favorites.map((favorite) =>
        Characters.getCharacterById(favorite)
      )
      const characters = await Promise.all(requests)
      const removeError = characters.filter(
        (character) => character !== STATUS.error
      )
      setData(removeError)
      setSearchName('')
      history.push(`/`)
      setStatus(STATUS.success)
    } else getData()
  }

  return (
    <Container>
      <Header>
        <img src={logo} alt="logo" />
        <h1>Explore o Universo</h1>
        <p>
          Mergulhe no domínio deslumbrante de todos os personagens clássicos que
          você ama - e aqueles que você descobrirá em breve!
        </p>
      </Header>
      <SearchInput
        value={searchName}
        onChange={(text) => {
          setOnlyFavorites(false)
          setSearchName(text)
          history.push(`/${text}`)
        }}
      />
      {status !== STATUS.success && <StatusMessage status={status} />}
      {status === STATUS.success && (
        <Main>
          <InfoContainer>
            <span>{`Econtrados ${data.length} heróis`}</span>
            <FiltersContainer>
              <Button
                onClick={() => {
                  setIsOrderByName(!isOrderByName)
                }}
              >
                <img src={hero} alt="ícone de herói" />
                {`Ordernar por nome - ${isOrderByName ? 'Z/A' : 'A/Z'}`}
                <img
                  src={isOrderByName ? toggleOn : toggleOff}
                  alt={isOrderByName ? 'togle on' : 'toggle off'}
                />
              </Button>
              <Button onClick={handleOnlyFavoriteClick}>
                <img src={favoriteFull} alt="ícone de coração" /> Somentente
                favoritos
              </Button>
            </FiltersContainer>
          </InfoContainer>
          {data && data.length === 0 && (
            <span>Nenhum resultado encontrado...</span>
          )}
          {data && data.length > 0 && (
            <ListCharacters>
              {data.map((character) => (
                <li key={character.id}>
                  <Link to={`detail/${character.id}`}>
                    <img
                      src={`${character.thumbnail.path}/${IMAGE_VARIANT.standard.standard_fantastic}.${character.thumbnail.extension}`}
                      alt="foto do personagem"
                    />
                  </Link>
                  <div>
                    {character.name}
                    <ButtonFavorite
                      onClick={() => {
                        handleFavoriteClick(character.id)
                      }}
                      isFavorite={isFavorite(character.id)}
                    />
                  </div>
                </li>
              ))}
            </ListCharacters>
          )}
          <Footer />
        </Main>
      )}
    </Container>
  )
}
