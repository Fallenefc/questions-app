export interface QuestionRaw {
  title: string,
  stem: string,
  category: string,
  options: string[],
  correct: number,
  ownership: string,
  // This will (or will not be) implemented later
  // difficulty?: string
}

interface _Question extends QuestionRaw {
  _id: string,
}

export type Question = Omit<_Question, 'correct'>; // this exports a type that omits the second parameter (passed as string);
// export type Question = Omit<_Question, 'correct' | 'ownership' >; // if I want to omit multiple 