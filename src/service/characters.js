import md5 from 'md5'

import { STATUS } from '../utils/Const'

const Characters = {
  getCharacters: async ({
    limit = 20,
    nameStartsWith = '',
    offset = 0,
    orderByName = false
  } = {}) => {
    try {
      const timeStamp = new Date().getTime()
      const hash = md5(
        timeStamp +
          process.env.REACT_APP_PRIVATE_KEY +
          process.env.REACT_APP_PUBLIC_KEY
      )

      const response = await fetch(
        `${
          process.env.REACT_APP_BASE_URL
        }/v1/public/characters?ts=${timeStamp}${
          nameStartsWith ? `&nameStartsWith=${nameStartsWith}` : ''
        }&limit=${limit}&apikey=${
          process.env.REACT_APP_PUBLIC_KEY
        }&hash=${hash}&offset=${offset}&orderBy=${
          orderByName ? 'name' : '-name'
        }`
      )

      if (response.status !== 200) return STATUS.error

      const json = await response.json()
      return json.data.results
    } catch (error) {
      return STATUS.error
    }
  },
  getCharacterById: async (characterId) => {
    try {
      const timeStamp = new Date().getTime()
      const hash = md5(
        timeStamp +
          process.env.REACT_APP_PRIVATE_KEY +
          process.env.REACT_APP_PUBLIC_KEY
      )

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/v1/public/characters/${characterId}?ts=${timeStamp}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`
      )

      if (response.status !== 200) return STATUS.error

      const json = await response.json()
      return json.data.results[0]
    } catch (error) {
      return STATUS.error
    }
  },
  getComicByCharacter: async (characterId) => {
    try {
      const timeStamp = new Date().getTime()
      const hash = md5(
        timeStamp +
          process.env.REACT_APP_PRIVATE_KEY +
          process.env.REACT_APP_PUBLIC_KEY
      )

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/v1/public/characters/${characterId}/comics?ts=${timeStamp}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}&orderBy=-onsaleDate&limit=10`
      )

      if (response.status !== 200) return STATUS.error

      const json = await response.json()
      return json.data.results
    } catch (error) {
      return STATUS.error
    }
  }
}

export default Characters
