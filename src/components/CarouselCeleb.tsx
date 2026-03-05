import type { FunctionComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import getAllCelebs from '../functions/GetAllCelebs.tsx';
import getProfession from '../functions/GetProfession.tsx';
import getCelebName, { loadIdToNameMap } from '../functions/GetCelebName.tsx';
import Share from './Share.tsx'
import Advert from "./Advert.tsx";
import { Person } from '../types/Person.tsx';

type CarouselCelebProps = {
  daysOld: number
  birthDateString: string
};

type Phrasing = {
  intro: string
  outro: string
}

function getPhrasing(yourDays: number, celebDays: number, diff: number): Phrasing {
  const diffText = diff === 1 ? '1 day' : `${diff} days`;
  const phrasings: Phrasing[] = [
    // Celebratory
    {
      intro: `At ${yourDays} days old, congratulations! You've outlasted:`,
      outro: `by ${diffText}.`
    },
    {
      intro: `You're ${yourDays} days old and still here, unlike:`,
      outro: `who only made it to ${celebDays}.`
    },
    {
      intro: `Another day, another celebrity outlived. At ${yourDays} days you've beaten:`,
      outro: `by ${diffText}.`
    },
    // Matter-of-fact
    {
      intro: `You've made it to ${yourDays} days. That's ${diffText} more than:`,
      outro: `who made it to ${celebDays}.`
    },
    {
      intro: `At ${yourDays} days old, you're still alive. At ${celebDays} days:`,
      outro: `was not.`
    },
    {
      intro: `You're ${diffText} ahead of:`,
      outro: `who checked out at ${celebDays}.`
    },
    // Philosophical
    {
      intro: `At your age of ${yourDays} days, you've outlived:`,
      outro: `who had already departed. You remain stubbornly alive.`
    },
    {
      intro: `Time waits for no one. At ${yourDays} days, you've waited ${diffText} longer than:`,
      outro: `who ran out of time at ${celebDays}.`
    },
    {
      intro: `At ${yourDays} days, you still have tomorrows. Unlike:`,
      outro: `who ran out at ${celebDays}.`
    },
    // Darkly humorous
    {
      intro: `Breaking news at day ${yourDays}! You've out-survived:`,
      outro: `by ${diffText}. The bar was ${celebDays}.`
    },
    {
      intro: `At ${yourDays} days, someone would be jealous. If they could be:`,
      outro: `only managed ${celebDays}.`
    },
    {
      intro: `Still breathing at ${yourDays} days? That's ${diffText} more than:`,
      outro: `could say at ${celebDays}.`
    },
    // Encouraging
    {
      intro: `Every day is a bonus. Today's bonus at day ${yourDays}: outliving:`,
      outro: `by ${diffText}.`
    },
    {
      intro: `At ${yourDays} days, you've got something they didn't — a pulse:`,
      outro: `ran out at ${celebDays}.`
    },
  ]

  // Use a seeded random based on the day so it's consistent for a given date
  const index = (yourDays + celebDays) % phrasings.length
  return phrasings[index]
}

const CarouselCeleb: FunctionComponent<CarouselCelebProps> = ({ daysOld, birthDateString }) => {
  const [celebs, setCelebs] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    setCurrentIndex(0);
    Promise.all([getAllCelebs(daysOld), loadIdToNameMap()]).then(([result]) => {
      setCelebs(result);
      setLoading(false);
    });
  }, [daysOld]);

  if (loading) {
    return (
      <div>
        <p>You are {daysOld} days old today!</p>
        <p>Finding celebrities...</p>
      </div>
    );
  }

  if (!celebs || celebs.length === 0) {
    return (
      <>
        <p>You are {daysOld} days old today!</p>
        <p>
          That's too young! We don't have any celebrities who died aged less than {daysOld} days.
        </p>
      </>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % celebs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? celebs.length - 1 : prevIndex - 1
    );
  };

  const hideCarouselClass = celebs.length === 1 ? 'carousel-hide' : '';

  return (
    <>
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <div
            className="carousel-content"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {celebs.map((celeb, index) => {
              const [yy, mm, dd] = birthDateString.split("-");

              // Construct the URL with parameters
              const bookmarkUrl = `${window.location.origin}${window.location.pathname}?yy=${yy}&mm=${mm}&dd=${dd}`;
              window.history.pushState({}, "", bookmarkUrl.toString());
              document.title = `Not Dead Yet: ${birthDateString}`;

              const epochDate = new Date(1900, 0, 1);

              const celebBirthDate = new Date(epochDate);
              celebBirthDate.setDate(epochDate.getDate() + celeb!.d!);
              const formattedBirthDate = new Date(celebBirthDate).toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' });

              const deathDate = new Date(celebBirthDate);
              deathDate.setDate(celebBirthDate.getDate() + celeb!.o!);
              const formattedDeathDate = deathDate.toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' });

              const link = 'https://en.wikipedia.org/wiki/' + (celeb!.w || getCelebName(celeb!.i).replace(/ /g, '_'));

              const celebDays = celeb!.o!;
              const diff = daysOld - celebDays;
              const name = getCelebName(celeb!.i);
              const phrasing = getPhrasing(daysOld, celebDays, diff);

              return (
                <div className="carousel-item" key={index}>
                  <p className="phrasing-intro">{phrasing.intro}</p>
                  <div className="name">
                    <a className="celeb" href={link} target="_blank">
                      {name}
                      <svg className="external-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zm-2 14H5V7h7V5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-7h-2v7z" />
                      </svg>
                    </a>
                  </div>
                  <p className="phrasing-outro">{phrasing.outro}</p>
                  <p className="celeb-details">
                    {name}, {getProfession(celeb!.s)},
                    <br />
                    born {formattedBirthDate},
                    <br />
                    died {formattedDeathDate}.
                  </p>
                  <div style={{ position: 'relative' }}>
                    <button onClick={prevSlide} className={'carousel-btn ' + hideCarouselClass}>
                      ◀
                    </button>
                    <Share name={getCelebName(celeb!.i)} />

                    <button onClick={nextSlide} className={'carousel-btn ' + hideCarouselClass}>
                      ▶
                    </button>
                  </div>
                  <Advert />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselCeleb;
