import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question, QuestionJSON } from 'src/app/models/question.model';
import { Answer } from 'src/app/models/answer.model';
import { TriviaService } from 'src/app/services/trivia.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { CONSTANTS } from 'src/assets/constants';
declare var $: any;

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  @Input() categories: any[];
  @Input() currentTeamIndex: number;
  @Output() nextTeamIndex: EventEmitter<number> = new EventEmitter();
  @Output() updateTeamPoints: EventEmitter<number> = new EventEmitter();
  @Output() questionAnswered: EventEmitter<number> = new EventEmitter();
  answerChoices: Answer[];
  activeQuestion: Question;
  questionText: string;
  isQuestionSelected: boolean = false;
  answerSelected: boolean = false; //disable other answer choices when answer has been selected

  constructor(private triviaService: TriviaService, private dataService: DataStorageService) { }

  ngOnInit() {
    console.log(this.categories);
  }

  cardSelected(e: Question, index1: number, index2: number, diff: string) {
    console.log(e);
    this.activeQuestion = e;
    this.questionText = this.triviaService.formatUnicode([this.activeQuestion])[0].question;

    this.answerChoices = [];
    this.activeQuestion.answerChoices.forEach(ans => {
      ans.text = this.triviaService.formatUnicodeSingular(ans.text);
      this.answerChoices.push(ans);
    });
    this.answerChoices = this.triviaService.shuffle(this.answerChoices);
    this.isQuestionSelected = true;

    this.categories[index1].questions[diff][index2].answered = true;
    this.dataService.saveItem(CONSTANTS.STORAGE_KEYS.Questions, this.categories);
    this.showModal();
  }

  replaceQuestion(): void {
    this.triviaService.getQuestionByCategoryAndDifficulty(this.activeQuestion.category.id, this.activeQuestion.difficulty).subscribe(res => {
      if (res && res.results) {
        this.answerChoices = [];
        const questionJSON = res.results[0];
        this.activeQuestion = new Question(questionJSON);
        this.questionText = this.triviaService.formatUnicodeSingular(this.activeQuestion.question);

        this.activeQuestion.answerChoices.forEach(ans => {
          ans.text = this.triviaService.formatUnicodeSingular(ans.text);
          this.answerChoices.push(ans);
        });
        this.answerChoices = this.triviaService.shuffle(this.answerChoices);
        
        //todo: update question obj in session storage
      }
    });
  }

  evaluateAnswer(correct) {
    this.answerSelected = true;
    this.activeQuestion.answered = true;
    if (correct) {
      console.log("correct");
      this.updateTeamPoints.emit(this.activeQuestion.points);
    }
    else {
      console.log("incorrect");
      this.updateTeamPoints.emit(-0.5 * this.activeQuestion.points);
    }
    this.nextTeamIndex.emit(this.currentTeamIndex === 0 ? 1 : 0);
    this.questionAnswered.emit(1);
    setTimeout(() => {
      this.closeModal();
      this.answerSelected = false;
    }, 3000)
  }

  closeModal() {
    this.isQuestionSelected = false;
    $("#questionModal").modal("hide");
  }

  showModal() {
    this.isQuestionSelected = true;
    $("#questionModal").modal({backdrop: 'static', keyboard: false});
    $("#questionModal").modal("show");
  }

}
