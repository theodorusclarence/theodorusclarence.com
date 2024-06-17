import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './CarouselArrowButtons';
import { DotButton, useDotButton } from './CarouselDotButton';

const Carousel = (props: any) => {
  const { slides, options } = props;
  const altSlides = Array.from(Array(5).keys());
  const [emblaRef, emblaApi] = useEmblaCarousel(options || {});

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className='embla'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>
          {slides &&
            slides.map((index: any) => (
              <div className='embla__slide' key={index}>
                <div className='embla__slide__number'>{index + 1}</div>
              </div>
            ))}
          {altSlides &&
            altSlides.map((index: any) => (
              <div className='embla__slide' key={index}>
                <div className='embla__slide__number'>{index + 1}</div>
              </div>
            ))}
        </div>
      </div>

      <div className='embla__controls'>
        <div className='embla__buttons'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className='embla__dots'>
          {scrollSnaps.map((_: any, index: any) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
