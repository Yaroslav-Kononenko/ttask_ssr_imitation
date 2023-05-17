import './ImageBox.scss';
import React, { useState, useEffect } from 'react';
import { ImageCard } from '../ImageCard';
import disco_dancer from '../../assets/disco_dancer.jpg';
import neon_vibes_man from '../../assets/neon_vibes_man.jpg';
import tokyo_girl from '../../assets/tokyo_girl.jpg';

export const ImageBox: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const imgList = [disco_dancer, neon_vibes_man, tokyo_girl];
  const MAIN_URL = 'https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new';

  const ssrEmulation = async () => {
    const res = await fetch(MAIN_URL);
    const num = await res.json();
    return num;
  }

  useEffect(() => {
    const ssrLoading = setInterval( async () => {
      const comboPromises = await Promise.all([ssrEmulation(), ssrEmulation()]);
      if (comboPromises.every((result) => result%2 === 0)) {
        clearInterval(ssrLoading);
        setIsLoading(false);
      }
    }, 2000) 
  })
  
  return (
    <div className="imagebox">
      <ul className="imagelist">
        {imgList.map((imgUrl) => {
          return(
            <li key={imgUrl}>
              <ImageCard url={imgUrl} isLoading={isLoading} />
            </li>
          );
        })}
      </ul>
    </div>
  )
};
