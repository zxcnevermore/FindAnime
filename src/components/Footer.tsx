import React from 'react';
import { animeSelector } from '../redux/slices/animeSlice';
import { useAppDispatch } from '../redux/store';
import { setPage } from '../redux/slices/searchSlice';
import { useSelector } from 'react-redux';

const Footer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { totalCount, data } = useSelector(animeSelector);

  const onClickLoad = () => {
    if (data.length < totalCount) {
      dispatch(setPage());
    }
  };

  return (
    <div className="footer-block">
      <div className="load-more">
        <button onClick={onClickLoad} className="button">
          Load more
        </button>
      </div>
    </div>
  );
};

export default Footer;
