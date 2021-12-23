import clsx from 'clsx';
import * as React from 'react';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';

import Accent from '@/components/Accent';

import { QuizType } from '@/types/quiz';

export default function Quiz(props: QuizType) {
  const [selected, setSelected] = React.useState<number>();

  const handleAnswer = (answerIndex: number) => {
    setSelected(answerIndex);
  };

  return (
    <div className='prose relative p-4 pt-8 mt-8 w-full rounded border !max-w-none dark:prose-invert dark:border-gray-600'>
      <div className='text-center'>
        <h4 className='text-lg md:text-xl'>{props.question}</h4>
        {props.description && (
          <p className='text-base md:text-sm'>{props.description}</p>
        )}
        {/* <button onClick={() => setSelected(undefined)}>reset</button> */}
      </div>
      <div className='grid gap-2 mt-4 md:grid-cols-2 md:gap-4'>
        {props.answers.map((answer, i) => {
          const answerIndex = i + 1;

          const optionStatus = answer.correct ? 'correct' : 'wrong';
          const selectedOption = selected;

          return (
            <button
              key={answerIndex}
              disabled={Boolean(selectedOption)}
              onClick={() => handleAnswer(answerIndex)}
              className={clsx(
                'relative p-2 rounded-md',
                'border dark:border-gray-600',
                'transition-colors',
                'disabled:cursor-not-allowed',
                {
                  'hover:bg-gray-50 dark:hover:bg-gray-900': !selectedOption,
                  'bg-green-300 dark:bg-green-400 text-gray-800':
                    selectedOption && optionStatus === 'correct',
                  'bg-red-300 dark:bg-red-400 text-gray-800':
                    selectedOption === answerIndex && optionStatus === 'wrong',
                }
              )}
            >
              <>{answer.option}</>
              {selectedOption && optionStatus === 'correct' ? (
                <HiOutlineCheckCircle className='block absolute right-4 top-1/2 text-xl text-white -translate-y-1/2' />
              ) : selectedOption === answerIndex ? (
                <HiOutlineXCircle className='block absolute right-4 top-1/2 text-xl text-white -translate-y-1/2' />
              ) : null}
            </button>
          );
        })}
      </div>
      {!selected ? (
        <p>Go ahead and pick one!</p>
      ) : (
        <p>
          <b>Explanation: </b>
          {props.explanation}
        </p>
      )}
      <div
        className={clsx(
          'absolute top-0 left-4 px-2 py-1 rounded-b-md',
          'border border-t-0 dark:border-gray-600'
        )}
      >
        <Accent>pop quiz!</Accent>
      </div>
    </div>
  );
}
