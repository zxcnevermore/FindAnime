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
    <div className='container-fullcontent'>
      <div className='fullcontent'>
        <div className='left'>
          <img src={animeById.image} alt='Ава'></img>
          <div>
            <h1>{animeById.title}</h1>
            <div className='properties'>
              <div className='status'>Статус {animeById.status}</div>
              <div className='episodes'>Эпизодов {animeById.episodes}</div>
            </div>
          </div>
        </div>
        <h2>Описание</h2>
        <div className='desc'>{animeById.desc}</div>
      </div>
    </div >
  )
}

export default FullAnimeBlock
