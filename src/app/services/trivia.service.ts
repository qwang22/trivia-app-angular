import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/assets/config';
import { CONSTANTS } from 'src/assets/constants';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  private teams: BehaviorSubject<any[]> = new BehaviorSubject(null);
  public teamsObservable = this.teams.asObservable();
  public activeQuestion: Question;
  //teams: any[];
  public currentTeamIndex: number = 0;

  constructor(private http: HttpClient) { }

  public getQuestions(): Observable<any> {
    return this.http.get<any>("https://opentdb.com/api.php?amount=20&difficulty=easy&type=multiple");
  }

  //get some # of questions of 1 category and 1 difficulty
  public getQuestionsByCategory(category: number, numQuestions: number, difficulty: string, type: string="multiple") {
    return this.http.get<any>(
      CONFIG.apiUrl + "?numQuestions=" + numQuestions + "&category=" + category + "&difficulty=" + difficulty + "&type=" + type
    );
  }

  //get n question of specified category and difficulty
  public getQuestionByCategoryAndDifficulty(category: number, difficulty: string, numQuestions: number = 1, type: string="multiple") {
    return this.http.get<any>(
      CONFIG.apiUrl + "?amount=" + numQuestions + "&category=" + category + "&difficulty=" + difficulty + "&type=" + type + 
      "&token=" + "838942a2af962f7eba9bfef7a8589b6b7936e528d0ce73ca8ba4196fe556c887"
    );
  }

  public getCategories() {
    return this.http.get<any>(
      CONFIG.apiBaseUrl + "/api_category.php"
    );
  }

  public getApiCount(categoryId: number) {
    return this.http.get<any>(
      CONFIG.apiBaseUrl + "/api_count.php?category=" + categoryId
    );
  }

  public shuffle(list): any[] {
    let j;
    let a;
    for(let i = list.length-1;i > 0;i--) {
      j = Math.floor(Math.random() * (i + 1));
      a = list[i];
      list[i] = list[j];
      list[j] = a;
    }
    return list;
  }

  public formatUnicode(questions): any[] {
    let formattedQuestionsList = [];
    questions.forEach(q => {
      // for (var code in CONSTANTS.UNICODE_DICT) {
      //   q.question = q.question.split(code).join(CONSTANTS.UNICODE_DICT[code]);
      // }
      q.question = this.decodeHtml(q.question);
      formattedQuestionsList.push(q);
    });
    return formattedQuestionsList;
  }

  public formatUnicodeSingular(text): string {
    let formattedString: string = text;
    for (var code in CONSTANTS.UNICODE_DICT) {
      //formattedString = formattedString.split(code).join(CONSTANTS.UNICODE_DICT[code]);
      formattedString = this.decodeHtml(text);
    }
    return formattedString;
  }

  public saveTeams(teams: any[]) {
    this.teams.next(teams);
  }

  decodeHtml(encodedHtml) {
    var txt = document.createElement("textarea");
    txt.innerHTML = encodedHtml;
    return txt.value;
  }
}
