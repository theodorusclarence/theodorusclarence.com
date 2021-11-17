type Answer = {
  option: React.ReactNode;
  correct?: boolean;
};

export type QuizType = {
  question: React.ReactNode;
  description?: React.ReactNode;
  explanation?: React.ReactNode;
  answers: Array<Answer>;
};
