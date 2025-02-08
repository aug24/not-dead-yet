import React, { useState } from "react";
import getAllCelebs from '../functions/GetAllCelebs.tsx';
import getProfession from '../functions/GetProfession.tsx';
import Share from './Share.tsx'
import Advert from "./Advert.tsx";

type CarouselCelebProps = {
  daysOld: number
  birthDateString: String
};

const CarouselCeleb: React.FC<CarouselCelebProps> = ({ daysOld, birthDateString }) => {
  let celebs = getAllCelebs(daysOld)

  if (!celebs || celebs.length == 0)
      return <>
              <p>You are {daysOld} days old today!</p>
              <p>
                  That's too young!  We don't have any celebrities who died aged less than {daysOld} days.
              </p>
          </>

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % celebs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? celebs.length - 1 : prevIndex - 1
    );
  };
                      let byDays = daysOld - celebs[0].o!

                      const message1 =
                          byDays==1
                            ? 'you have outlived:'
                            : byDays<5
                              ? 'you have now outlived:'
                              : 'you have easily outlived:'

                      const message2 =
                          byDays==1
                            ? `by exactly one day.`
                            : `by ${byDays} days!`
            const hideCarouselClass = celebs.length == 1 ? 'carousel-hide' : ''
  return (<>
                                 <p>At <em> {daysOld} </em> days old today, {message1}</p>
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div
          className="carousel-content"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >

          {celebs.map((celeb) => {


                      const [yy, mm, dd] = birthDateString.split("-");

                      // Construct the URL with parameters
                      const bookmarkUrl = `${window.location.origin}${window.location.pathname}?yy=${yy}&mm=${mm}&dd=${dd}`;
                      window.history.pushState({}, "", bookmarkUrl.toString());
                      document.title = `Not Dead Yet: ${birthDateString}`;

                      const formattedBirthDate = new Date(celeb!.b!).toLocaleDateString('en-UK', {  year: 'numeric',  month: 'long',  day: 'numeric'});
                      let deathDate = new Date(celeb!.b!);
                      deathDate.setDate(deathDate.getDate() + celeb!.o!);
                      const formattedDeathDate = deathDate.toLocaleDateString('en-UK', {  year: 'numeric',  month: 'long',  day: 'numeric'});

                      const link = 'https://en.wikipedia.org/wiki/' + (celeb!.w || celeb!.l?.replace(/ /g, '_'))

            return <div className="carousel-item">
                              <p>
                                  <div className="name">
                                  <a className="celeb" href={link} target="_blank">
                                  {celeb!.l}
                                    <svg className="external-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zm-2 14H5V7h7V5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-7h-2v7z"/>
                                    </svg>
                                  </a>
                                  </div>
                                  <br/>
                                  {message2}
                              </p>
                              <p>
                                  {celeb!.l}, {getProfession(celeb!.s)}
                                  <br/>
                                  was born on {formattedBirthDate},
                                  <br/>
                                  and died on {formattedDeathDate},
                                  <br/>
                                   at {celeb!.o} days old.
                              </p>
                              <div style={{position:'relative'}}>
                                  <button onClick={prevSlide} className={'carousel-btn ' + hideCarouselClass}>
                                    ◀
                                  </button>
                                                          <Share name={celeb!.l}/>

                                  <button onClick={nextSlide} className={'carousel-btn ' + hideCarouselClass}>
                                    ▶
                                  </button>
                              </div>
                              <Advert/>
            </div>
          })}
        </div>
      </div>
    </div>
</>
  );
};

export default CarouselCeleb;
