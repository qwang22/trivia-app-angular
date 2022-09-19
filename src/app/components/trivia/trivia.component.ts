import { Component, OnInit, ɵConsole } from '@angular/core';
import { TriviaService } from '../../services/trivia.service';
import { CONSTANTS } from 'src/assets/constants';
import { combineLatest } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { Team } from 'src/app/models/team.model';
declare var $: any;

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {

  isGameStarted: boolean;
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any;
  questionsByCategory: any[] = [];
  numQuestionsPerDifficulty: any = {
    easy: 1,
    medium: 1,
    hard: 1
  }
  teams: Team[];
  currentTeamIndex: number;
  currentTeam: Team;
  winner: Team;
  numQuestionsRemaining: number;
  gameEnded: boolean;

  constructor(private triviaService: TriviaService, private dataService: DataStorageService) { 
    this.dropdownSettings = CONSTANTS.DROPDOWN_SETTINGS;

    for (let key in CONSTANTS.CATEGORIES_DICT) {
      this.dropdownList.push({ item_id: CONSTANTS.CATEGORIES_DICT[key], item_text: key })
    }

    this.questionsByCategory = this.dataService.getItem(CONSTANTS.STORAGE_KEYS.Questions) != undefined 
      ? this.dataService.getItem(CONSTANTS.STORAGE_KEYS.Questions)
      : [];

    this.isGameStarted = this.questionsByCategory.length > 0 ? true : false;

    this.currentTeamIndex = this.dataService.getItem(CONSTANTS.STORAGE_KEYS.CurrentTeamIndex) != undefined 
      ? this.dataService.getItem(CONSTANTS.STORAGE_KEYS.CurrentTeamIndex)
      : 0;

    this.teams = this.dataService.getItem(CONSTANTS.STORAGE_KEYS.Teams);
    this.currentTeam = this.teams ? this.teams[this.currentTeamIndex] : null;
    this.gameEnded = this.dataService.getItem(CONSTANTS.STORAGE_KEYS.NumQuestionsRemaining) === 0 ? true : false;
  }

  ngOnInit() {    
    if (this.gameEnded) {
      this.getWinner();
    }
  }

  getQuestionsOfSelectedCategories() {
    this.questionsByCategory = [];
    this.dataService.deleteItem(CONSTANTS.STORAGE_KEYS.Questions);
    this.dataService.deleteItem(CONSTANTS.STORAGE_KEYS.NumQuestionsRemaining);
    this.numQuestionsRemaining = 
      (this.numQuestionsPerDifficulty.easy + this.numQuestionsPerDifficulty.medium + this.numQuestionsPerDifficulty.hard) * this.selectedItems.length;
    this.dataService.saveItem(CONSTANTS.STORAGE_KEYS.NumQuestionsRemaining, this.numQuestionsRemaining);
    this.selectedItems.forEach((item, index) => {

      this.questionsByCategory.push({
        category: item.item_text,
        questions: {
          easy: [],
          medium: [],
          hard: []
        }
      });

      let easy = this.triviaService.getQuestionByCategoryAndDifficulty(item.item_id, "easy", this.numQuestionsPerDifficulty.easy);
      let medium = this.triviaService.getQuestionByCategoryAndDifficulty(item.item_id, "medium", this.numQuestionsPerDifficulty.medium);
      let hard = this.triviaService.getQuestionByCategoryAndDifficulty(item.item_id, "hard", this.numQuestionsPerDifficulty.hard);

      combineLatest(easy, medium, hard).subscribe(([res_easy, res_medium, res_hard]) => {
        res_easy.results.forEach(q => {
          this.questionsByCategory[index].questions.easy.push(q);
        });
        res_medium.results.forEach(q => {
          this.questionsByCategory[index].questions.medium.push(q);
        });
        res_hard.results.forEach(q => {
          this.questionsByCategory[index].questions.hard.push(q);
        });
        this.dataService.saveItem(CONSTANTS.STORAGE_KEYS.Questions, this.questionsByCategory);
        this.isGameStarted = true;
      });
    });
  }

  questionAnswered(e) {
    this.numQuestionsRemaining -= 1;
    this.dataService.saveItem(CONSTANTS.STORAGE_KEYS.NumQuestionsRemaining, this.numQuestionsRemaining);
    if (this.numQuestionsRemaining === 0) {
      this.gameEnded = true;
      this.getWinner();
    }
  }

  updateCurrentTeam(e) {
    if (this.teams && this.teams.length > 0) {
      this.currentTeamIndex = e;
      this.currentTeam = this.teams[e];
      this.dataService.saveItem(CONSTANTS.STORAGE_KEYS.CurrentTeamIndex, this.currentTeamIndex);
    }
  }

  updateTeamPoints(points) {
    if (this.teams && this.teams.length > 0) {
      this.teams[this.currentTeamIndex].score += points;
      this.dataService.saveItem(CONSTANTS.STORAGE_KEYS.Teams, this.teams);
    }
  }

  getWinner() {
    this.winner = this.teams[0].score > this.teams[1].score ? this.teams[0] : this.teams[1];
  }

  //remove questions, same teams
  clearQuestions(): void {
    this.dataService.deleteItem(CONSTANTS.STORAGE_KEYS.Questions);
    this.dataService.deleteItem(CONSTANTS.STORAGE_KEYS.CurrentTeamIndex);
    this.dataService.deleteItem(CONSTANTS.STORAGE_KEYS.NumQuestionsRemaining);
    this.isGameStarted = false;
    this.questionsByCategory = [];
    this.teams = [];
    this.currentTeamIndex = 0;
  }

  //reset everything
  newGame(): void {
    this.dataService.resetAll();
    this.isGameStarted = false;
    this.questionsByCategory = [];
    this.teams = [];
    this.currentTeamIndex = 0;
  }

}
