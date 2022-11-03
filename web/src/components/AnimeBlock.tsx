import React from 'react';
import { Link } from 'react-router-dom'

type TAnimeProps = {
  id: string;
  image: string;
  title: string;
};

const AnimeBlock: React.FC<TAnimeProps> = ({ id, image, title}) => {
  return (

    <div className="main">
      <div className="anime-block">
        <Link to={`anime/${id}`}>
          <img width={300} height={366} src={image} alt="avatar"></img>
        </Link>
        <div className="title">{title}</div>
      </div>
    </div >


  );
};

export default AnimeBlock;
