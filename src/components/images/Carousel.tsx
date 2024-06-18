import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './CarouselArrowButtons';
import { DotButton, useDotButton } from './CarouselDotButton';
import Img from './Img';

const Carousel = (props: any) => {
  const { slides, options, height, width } = props;
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
          {Object.entries(slides).map(([path, altText], index) => (
            <Img
              key={index}
              mdx
              className='embla__slide'
              publicId={String(path)}
              alt={String(altText)}
              width={width || 900}
              height={height || 900}
            />
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
