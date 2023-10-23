import React, { useState, useEffect } from 'react';
import bannerImg1 from '../../img/01 3.png';
import bannerImg2 from '../../img/image 8.png';
import bannerImg3 from '../../img/image 7.png';
import { useSpring, animated } from 'react-spring';

function Banner() {
  const bannerText = [
    {
      h2: 'WELCOME TO GREENSHOP',
      h1: `LET'S MAKE A BETTER PLANET`,
      p: 'We are an online plant shop offering a wide range of cheap and trendy plants.',
      button: 'SHOP NOW',
      url: bannerImg1
    },
    {
      h2: 'GREENSHOPS IS BEST',
      h1: `YOU CAN FIND ANYTING`,
      p: 'Definitely there is flower you will like',
      button: 'SHOP NOW',
      url: bannerImg2
    },
    {
      h2: 'GREENSHOPS IS BEAUTIFUL',
      h1: `A BIG VARIETY OF FLOWERS`,
      p: 'You will be everything, because all of our flowers are beautiful',
      button: 'SHOP NOW',
      url: bannerImg3
    }
  ];

  const [indexBanner, setIndexBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexBanner((prevIndex) => (prevIndex + 1) % bannerText.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const slideProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    duration:2000,
  });

  return (
    <div className="wrapper-main">
      <div className="main">
        <animated.div style={slideProps}>
          <div className='main-h2'>{bannerText[indexBanner].h2}</div>
        </animated.div>
        <animated.div style={slideProps}>
          <div className='main-h1'><b>{bannerText[indexBanner].h1}</b></div>
        </animated.div>
        <animated.div style={slideProps}>
          <div className='main-p'>{bannerText[indexBanner].p}</div>
        </animated.div>
        <animated.div style={slideProps}>
          <button>{bannerText[indexBanner].button}</button>
        </animated.div>
      </div>
      <animated.img
        style={slideProps}
        className='bannerImg'
        src={bannerText[indexBanner].url}
        alt=""
      />
    </div>
  );
}

export default Banner;
