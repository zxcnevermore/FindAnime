import React from 'react';
import { animeSelector } from '../redux/slices/animeSlice';
import { useSelector } from 'react-redux';
import AnimeBlock from '../components/AnimeBlock';
import Skeleton from '../components/Skeleton';

const Home: React.FC = () => {
  const { data, load } = useSelector(animeSelector);

  const mapedAnime = data.map((obj) => <AnimeBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="found-block">
      <div className="text">Found {data.length} result</div>

      <div className="main">{load === 'loading' ? skeleton : mapedAnime}</div>

    </div>


  );
};

export default Home;
