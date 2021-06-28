import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import logo from '../assets/logo_menor.svg'
import favoriteFull from '../assets/favorito_01.svg'
import favoriteEmpty from '../assets/favorito_02.svg'
import comicIcon from '../assets/ic_quadrinhos.svg'
import rtingOff from '../assets/avaliacao_off.svg'

import { IMAGE_VARIANT } from '../utils/Const'

import Container from '../components/Container'
import SearchInput from '../components/SearchInput'
import Footer from '../components/Footer'

import Characters from '../service/characters'

import CharacterContext from '../context/character'

const Header = styled.header`
  display: flex;
  width: 100%;

  div {
    margin-left: 30px;
  }

  .logo {
    padding-left: 10%;
  }
`

const Main = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 80px;
  flex-direction: column;
  align-items: center;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  background-color: green;
  opacity: 0.1;

  div {
    font-size: 13em;
    padding-top: 50px;
    padding-left: 50px;
    padding-right: 50px;
    font-weight: bold;
    color: white;
    text-transform: uppercase;
  }
`

const InfoCharacter = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 30px;
  align-items: center;
  text-transform: uppercase;
  color: #404040;
`

const Details = styled.div`
  width: 40%;

  p {
    text-align: justify;
    color: #8c8c8c;
    font-weight: 500;
  }

  button {
    background-color: transparent;
    border: none;
  }
`

const IconWithDescription = styled.span`
  display: flex;
  align-items: center;
  img {
    margin-right: 15px;
  }
  color: #404040;
  font-weight: 500;
  font-size: 16px;
`

const ContainerInline = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  p {
    text-align: left;
    font-size: 12px;
    font-weight: bold;
    color: #4c4c4c;
  }
`

const LabelWithInfo = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-right: 15px;
    color: #4c4c4c;
  }
`

const ListComics = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 75px;
  margin-top: 40px;
  padding-inline-start: 0;

  li {
    display: flex;
    flex-direction: column;
  }

  span {
    max-width: 150px;
    font-weight: bold;
    margin-top: 15px;
  }
`

const ContainerComic = styled.div`
  width: 80%;
  p {
    text-align: left;
    font-size: 1.4em;
    color: #404040;
    font-weight: bold;
  }
`

export default function Detail() {
  const { characterId } = useParams()
  const [character, setCharacter] = useState(null)
  const [comics, setComics] = useState([])

  const { handleFavoriteClick, isFavorite } = useContext(CharacterContext)

  useEffect(() => {
    const getData = async () => {
      if (characterId > 0) {
        const characterInfo = await Characters.getCharacterById(characterId)
        setCharacter(characterInfo[0])
        const comicResponse = await Characters.getComicByCharacter(characterId)
        setComics(comicResponse)
      }
    }
    getData()
  }, [])

  return (
    <Container>
      <Header>
        <img src={logo} alt="logo" className="logo" />
        <SearchInput size="small" />
      </Header>
      {character && (
        <>
          <Background>
            <div>{character.name}</div>
          </Background>
          <Main>
            <InfoCharacter>
              <Details>
                <Title>
                  {character.name}
                  <button
                    type="button"
                    onClick={() => {
                      handleFavoriteClick(character.id)
                    }}
                  >
                    <img
                      src={
                        isFavorite(character.id) ? favoriteFull : favoriteEmpty
                      }
                      alt="logo"
                    />
                  </button>
                </Title>
                <p>{character.description}</p>
                <ContainerInline>
                  <div>
                    <p>Quadrinhos</p>
                    <IconWithDescription>
                      <img src={comicIcon} alt="quadrinho" />
                      {character.comics.available}
                    </IconWithDescription>
                  </div>
                  <div>
                    <p>Filmes</p>
                    <IconWithDescription>
                      <img src={comicIcon} alt="quadrinho" />
                      {character.series.available}
                    </IconWithDescription>
                  </div>
                </ContainerInline>
                <LabelWithInfo>
                  <p>Rating:</p>
                  <img src={rtingOff} alt="quadrinho" />
                  <img src={rtingOff} alt="quadrinho" />
                  <img src={rtingOff} alt="quadrinho" />
                  <img src={rtingOff} alt="quadrinho" />
                  <img src={rtingOff} alt="quadrinho" />
                </LabelWithInfo>
                <LabelWithInfo>
                  <p>Último quadrinho:</p>
                  13 fev. 2020
                </LabelWithInfo>
              </Details>
              <img
                src={`${character.thumbnail.path}/${IMAGE_VARIANT.portrait.portrait_uncanny}.${character.thumbnail.extension}`}
                alt=""
              />
            </InfoCharacter>
            <ContainerComic>
              <p>Últimos lançamentos</p>
              <ListComics>
                {comics.map((comic) => (
                  <li key={comic.id}>
                    <img
                      src={`${comic.thumbnail.path}/${IMAGE_VARIANT.portrait.portrait_xlarge}.${character.thumbnail.extension}`}
                      alt={comic.title}
                    />
                    <span>{comic.title}</span>
                  </li>
                ))}
              </ListComics>
            </ContainerComic>
            <Footer />
          </Main>
        </>
      )}
    </Container>
  )
}
