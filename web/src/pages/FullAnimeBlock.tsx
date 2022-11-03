import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Skeleton from '../components/Skeleton'
import { animeByIdSelector, fetchAnimeById } from '../redux/slices/animeByIdSlice';
import { useAppDispatch } from '../redux/store';
import FullBlock from '../components/FullBlock';



const FullAnimeBlock: React.FC = () => {
  const { id } = useParams()
  const { data, load } = useSelector(animeByIdSelector)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchAnimeById(id))
  },[])

  console.log(data)

  const mapedAnimeById = data.map((anime) => <FullBlock key={anime.id} {...anime} />);
  const skeleton = [...new Array(1)].map((_, index) => <Skeleton key={index} />);


  return (
    <>
      <div className='container-fullcontent'>
      {load === 'loading' ? skeleton : mapedAnimeById}
      </div>
    </>
  )
}

export default FullAnimeBlock
