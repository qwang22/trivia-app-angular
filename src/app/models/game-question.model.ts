import { Question } from './question.model';

export class GameQuestion {
    category: string;
    questions: QuestionsByDifficulty;
}

export class QuestionsByDifficulty {
    easy: Question[];
    medium: Question[];
    hard: Question;
}