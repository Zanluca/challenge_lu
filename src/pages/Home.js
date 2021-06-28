import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory, useParams, Link } from 'react-router-dom'

import logo from '../assets/logo.svg'
import hero from '../assets/ic_heroi.svg'
import favoriteFull from '../assets/favorito_01.svg'
import favoriteEmpty from '../assets/favorito_02.svg'
import toggleOff from '../assets/toggle_off.svg'
import toggleOn from '../assets/toggle_on.svg'

import { IMAGE_VARIANT } from '../utils/Const'

import useDebounce from '../hooks/use-debounce'

import SearchInput from '../components/SearchInput'
import Container from '../components/Container'
import Footer from '../components/Footer'

import Characters from '../service/characters'

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
  /* background-color: green; */
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
  const { startsWith } = useParams()
  const debounceSearchTerm = useDebounce(startsWith, 500)
  const [searchName, setSearchName] = useState(startsWith)
  const [isOrderByName, setIsOrderByName] = useState(false)

  const getData = async () => {
    const paylod = {
      nameStartsWith: debounceSearchTerm,
      orderByName: isOrderByName
    }
    const character = await Characters.getCharacters(paylod)
    setData(character)
  }

  useEffect(() => {
    getData()
  }, [debounceSearchTerm, isOrderByName])

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
          setSearchName(text)
          history.push(`/${text}`)
        }}
      />
      <Main>
        <InfoContainer>
          <span>{`Econtrados ${data.length} heróis`}</span>
          <FiltersContainer>
            <Button
              onClick={() => {
                setIsOrderByName(!isOrderByName)
              }}
            >
              <img src={hero} alt="logo" />
              Ordernar por nome - A/Z
              <img
                src={isOrderByName ? toggleOn : toggleOff}
                alt={isOrderByName ? 'togle on' : 'toggle off'}
              />
            </Button>
            <Button>
              <img src={favoriteFull} alt="logo" /> Somentente favoritos
            </Button>
          </FiltersContainer>
        </InfoContainer>
        <ListCharacters>
          {data.map((character) => (
            <li key={character.id}>
              <Link to={`detail/${character.id}`}>
                <img
                  src={`${character.thumbnail.path}/${IMAGE_VARIANT.standard.standard_fantastic}.${character.thumbnail.extension}`}
                  alt=""
                />
                <div>
                  {character.name}
                  <img src={favoriteEmpty} alt="logo" />
                </div>
              </Link>
            </li>
          ))}
        </ListCharacters>
        <Footer />
      </Main>
    </Container>
  )
}
