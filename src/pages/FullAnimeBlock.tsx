import React from 'react'
import { useParams } from 'react-router-dom'
import { TAnime } from '../redux/slices/animeSlice'
import axios from 'axios'
import Skeleton from '../components/Skeleton'

const FullAnimeBlock: React.FC = () => {

  const { id } = useParams()
  const [animeById, setAnimeById] = React.useState<TAnime>()

  React.useEffect(() => {
    const fetchAnimeById = async () => {
      const { data } = await axios.get<TAnime>(`https://63051ff2697408f7edc23a12.mockapi.io/animes/${id}`)
      setAnimeById(data)
    }
    fetchAnimeById();
  }, [])

  if (!animeById) {
    return <Skeleton />
  }

  return (
    <div className='App'>
      <img src={animeById.image} alt='Ава'></img>
      <div>{animeById.title}</div>
      <div>{animeById.synopsis}</div>
      <div>{animeById.status}</div>
      <div>{animeById.episodes}</div>
    </div>
  )
}

export default FullAnimeBlock
