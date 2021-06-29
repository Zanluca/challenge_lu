import React, { useContext, useEffect, useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'

import logo from '../assets/logo_menor.svg'
import comicIcon from '../assets/ic_quadrinhos.svg'
import movieIcon from '../assets/ic_trailer.svg'

import { IMAGE_VARIANT } from '../utils/Const'

import Container from '../components/Container'
import SearchInput from '../components/SearchInput'
import Footer from '../components/Footer'
import ButtonFavorite from '../components/ButtonFavorite'
import Rating from '../components/Rating'

import Characters from '../service/characters'

import CharacterContext from '../context/character'

const Header = styled.header`
  display: flex;
  width: 85%;
  margin-top: 40px;
  align-items: center;

  div {
    margin-left: 40px;
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
    padding-top: 150px;
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
  width: 30%;

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
  const [inputText, setInputText] = useState('')
  const [lastComic, setLastComic] = useState(null)
  const [rating, setRating] = useState(0)

  const history = useHistory()

  const { handleFavoriteClick, isFavorite } = useContext(CharacterContext)

  useEffect(() => {
    const getData = async () => {
      if (characterId > 0) {
        const characterInfo = await Characters.getCharacterById(characterId)
        setCharacter(characterInfo)
        const comicResponse = await Characters.getComicByCharacter(characterId)
        setComics(comicResponse)
        const lastDate = comicResponse[0].dates[0].date
        const date = new Date(lastDate)
        const options = {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        }
        setLastComic(
          date.toLocaleDateString('pt-BR', options).replace(/de\s/gi, ' ')
        )
      }
      setRating(Math.random() * 6)
    }
    getData()
  }, [])

  return (
    <Container>
      <Header>
        <Link className="logo" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <SearchInput
          size="small"
          value={inputText}
          onChange={(text) => {
            setInputText(text)
          }}
          onKeyDown={(evt) => {
            if (evt.keyCode === 13 && evt.shiftKey === false) {
              evt.preventDefault()
              history.push(`/${inputText}`)
            }
          }}
        />
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
                  <ButtonFavorite
                    onClick={() => {
                      handleFavoriteClick(character.id)
                    }}
                    isFavorite={isFavorite(character.id)}
                  />
                </Title>
                <p>{character.description}</p>
                <ContainerInline>
                  <div>
                    <p>Quadrinhos</p>
                    <IconWithDescription>
                      <img src={comicIcon} alt="ícone quadrinho" />
                      {character.comics.available}
                    </IconWithDescription>
                  </div>
                  <div>
                    <p>Filmes</p>
                    <IconWithDescription>
                      <img src={movieIcon} alt="ícone filmes" />
                      {character.series.available}
                    </IconWithDescription>
                  </div>
                </ContainerInline>
                <Rating numberOfStars={rating} />
                <LabelWithInfo>
                  <p>Último quadrinho:</p>
                  {lastComic}
                </LabelWithInfo>
              </Details>
              <img
                src={`${character.thumbnail.path}/${IMAGE_VARIANT.portrait.portrait_uncanny}.${character.thumbnail.extension}`}
                alt="foto do personagem"
              />
            </InfoCharacter>
            <ContainerComic>
              <p>Últimos lançamentos</p>
              <ListComics>
                {comics.map((comic) => (
                  <li key={comic.id}>
                    <img
                      src={`${comic.thumbnail.path}/${IMAGE_VARIANT.portrait.portrait_xlarge}.${character.thumbnail.extension}`}
                      alt={`capa do quadrinho ${comic.title}`}
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
