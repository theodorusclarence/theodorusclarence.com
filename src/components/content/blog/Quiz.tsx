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
    <div className='relative pt-8 mt-8 w-full p-4 prose border rounded dark:border-gray-600 dark:prose-dark !max-w-none'>
      <div className='text-center'>
        <h4 className='text-lg md:text-xl'>{props.question}</h4>
        {props.description && (
          <p className='text-base md:text-sm'>{props.description}</p>
        )}
        {/* <button onClick={() => setSelected(undefined)}>reset</button> */}
      </div>
      <div className='grid gap-2 mt-4 md:gap-4 md:grid-cols-2'>
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
                'p-2 rounded-md relative',
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
                <HiOutlineCheckCircle className='absolute block text-xl text-white -translate-y-1/2 right-4 top-1/2' />
              ) : selectedOption === answerIndex ? (
                <HiOutlineXCircle className='absolute block text-xl text-white -translate-y-1/2 right-4 top-1/2' />
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
          'py-1 px-2 absolute top-0 left-4 rounded-b-md',
          'border dark:border-gray-600 border-t-0'
        )}
      >
        <Accent>pop quiz!</Accent>
      </div>
    </div>
  );
}
