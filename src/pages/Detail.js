import { useParams } from 'react-router-dom'
import React from 'react'

export default function Detail() {
  const { characterId } = useParams()

  return <div>{`Detail ${characterId}`}</div>
}
