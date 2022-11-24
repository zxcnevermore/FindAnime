import React from 'react';
import { animeSelector } from '../redux/slices/animeSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { searchSelector, setCurrentTitle } from '../redux/slices/searchSlice';
import { fetchAnime } from '../redux/slices/animeSlice';
import AnimeBlock from '../components/AnimeBlock';
import Skeleton from '../components/Skeleton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Navigate, redirect } from 'react-router-dom';

const Home: React.FC = () => {
  const { anime, load } = useSelector(animeSelector);
  const [value, setValue] = React.useState('');
  const mapedAnime = anime.map((obj) => <AnimeBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(10)].map((_, index) => <Skeleton key={index} />);
  const dispatch = useAppDispatch();
  const { searchValue, limitAnime } = useSelector(searchSelector);


  React.useEffect(()  => {
    dispatch(setCurrentTitle(searchValue));
    setValue(searchValue);
    const search = searchValue;
    const limit = limitAnime;
    dispatch(fetchAnime({ search, limit }));
  }, [limitAnime]);


  return (
    <>
    <Header/>
      <div className="content">
        <div className="found-block">Found {anime.length} result</div>
        <div className="main">{load === 'loading' ? skeleton : mapedAnime}</div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
