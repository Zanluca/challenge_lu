import md5 from 'md5'

const Characters = {
  getCharacters: async ({
    limit = 20,
    nameStartsWith = '',
    offset = 0,
    orderByName = false
  } = {}) => {
    const timeStamp = new Date().getTime()
    const hash = md5(
      timeStamp +
        process.env.REACT_APP_PRIVATE_KEY +
        process.env.REACT_APP_PUBLIC_KEY
    )

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/v1/public/characters?ts=${timeStamp}${
        nameStartsWith ? `&nameStartsWith=${nameStartsWith}` : ''
      }&limit=${limit}&apikey=${
        process.env.REACT_APP_PUBLIC_KEY
      }&hash=${hash}&offset=${offset}${orderByName ? '&orderBy=name' : ''}`
    )
    const json = await response.json()
    return json.data.results
  }
}

export default Characters
