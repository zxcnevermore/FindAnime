import React from 'react'

interface TAnimeProps {
  id: number;
  image: string;
  title: string;
  episodes: number;
  status: string;
  desc: string;
  genres: string[];
  type: string;
}

const FullAnimeBlock:React.FC<TAnimeProps> = ({image, title, episodes, status, desc, genres, type}) => {
  return (
    <div className='container-fullcontent'>
      <div className='fullcontent'>
        <div className='left'>
          <img src={image} alt='Ава'></img>
          <div>
            <h1>{title}</h1>
            <div className='properties'>
              <div className='status'>Статус: {status}</div>
              <div className='episodes'>Эпизодов: {episodes}</div>
              <div className='genres'>Жанры: {genres.map((genre) => <li>{genre}</li>)}</div>
              <div className='type'>Тип: {type}</div>
            </div>
          </div>
        </div>
        <h2>Описание</h2>
        <div className='desc'>{desc}</div>
      </div>
    </div >
  )
}

export default FullAnimeBlock
