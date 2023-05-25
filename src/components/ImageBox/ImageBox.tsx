import './ImageBox.scss';
import React, { useState, useEffect } from 'react';
import { ImageCard } from '../ImageCard';
import { imgList, MAIN_URL } from '../helpers';

export const ImageBox: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const req = async (): Promise<number> => {
    const response = await fetch(MAIN_URL);
    return await response.json();
  }

  const ssrEmulation = async () => {
    try {
      const responses: number[] = await Promise.all([await req(), await req()]);
      if (responses.every((num: number) => num % 2 === 0)) {
        setIsLoading(false);
      } else {
        await ssrEmulation();
      }
    } catch (error) {
      alert(`Ooops this error was appeared: ${error}`);
    }
  };

  useEffect(() => {
    ssrEmulation();
  }, [])
  
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
