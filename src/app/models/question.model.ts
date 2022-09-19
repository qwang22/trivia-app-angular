import { Category } from './category.model'
import { CONSTANTS } from 'src/assets/constants';
import { Answer } from './answer.model';

export class Question {
    question: string;
    category: Category;
    correctAnswer: Answer;
    incorrectAnswers: Answer[];
    difficulty: string;
    points: number;
    answerChoices: Answer[];
    answered: boolean;

    constructor(questionResult: any) {
        this.question = questionResult.question;
        this.category = new Category(questionResult.category);
        this.correctAnswer = new Answer(questionResult.correct_answer, true);
        this.incorrectAnswers = [new Answer(questionResult.incorrect_answers[0], false), new Answer(questionResult.incorrect_answers[1], false), new Answer(questionResult.incorrect_answers[2], false)]
        this.difficulty = questionResult.difficulty;
        this.points = CONSTANTS.POINTS_DICT[this.difficulty];
        this.answerChoices = [this.correctAnswer, ...this.incorrectAnswers]
        this.answered = false;
    }
}

export class QuestionJSON {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}