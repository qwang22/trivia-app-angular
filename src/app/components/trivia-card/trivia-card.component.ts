import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TriviaService } from '../../services/trivia.service';
import { Question, QuestionJSON } from 'src/app/models/question.model';
import { Answer } from 'src/app/models/answer.model';

@Component({
  selector: 'app-trivia-card',
  templateUrl: './trivia-card.component.html',
  styleUrls: ['./trivia-card.component.css']
})
export class TriviaCardComponent implements OnInit {

  @Input() questionJSON: QuestionJSON;
  @Input() answers = [];
  @Input() disabled: boolean;
  @Output() cardSelected: EventEmitter<Question> = new EventEmitter();
  question: Question;
  answered: boolean = false;
  points: number = 0;

  constructor(private triviaService: TriviaService) {
    // this.answers = [
    //   new Answer("ans1", true),
    //   new Answer("ans2", false),
    //   new Answer("ans3", false),
    //   new Answer("ans4", false),
    // ]
    // this.question = {
    //   question: "What is the blah blah blah blah blah of blah blah blah blah in blah blah when blah blah and blah blah?",
    //   category: new Category(CONSTANTS.CATEGORY.Gen_Knowledge),
    //   difficulty: "easy"
    // }
    // this.correctAnswer = { text: "ans1" };
   }

   ngOnInit() {
    this.question = new Question(this.questionJSON);
    this.question.answerChoices = this.triviaService.shuffle(this.question.answerChoices);
  }

  replaceQuestion(): void {
    this.triviaService.getQuestionByCategoryAndDifficulty(this.question.category.id, this.question.difficulty).subscribe(res => {
      if (res && res.results) {

        this.answers = [];
        this.question.question = res.results[0].question;

        let allAnswers: Answer[] = [];
        res.results[0].incorrect_answers.forEach(ans => {
          allAnswers.push(new Answer(ans, false));
        });
        allAnswers = this.triviaService.shuffle([new Answer(res.results[0].correct_answer, true), ...allAnswers]);
        this.answers = allAnswers;
      }
    });
  }

  selectCard() {
    this.triviaService.activeQuestion = this.question;
    this.cardSelected.emit(this.question);
  }

}