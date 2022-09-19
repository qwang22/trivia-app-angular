import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { TokenResponse } from 'src/app/models/token-response.model';
import { CONSTANTS } from 'src/assets/constants';
import { TriviaService } from 'src/app/services/trivia.service';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-data-scraper',
  templateUrl: './data-scraper.component.html',
  styleUrls: ['./data-scraper.component.css']
})
export class DataScraperComponent implements OnInit {
  token: string;
  categories: any;
  allQuestions: any[];
  allQuestionsEasy: any[] = [];
  allQuestionsMed: any[] = [];
  allQuestionsHard: any[] = [];

  constructor(private dataService: DataStorageService, private triviaService: TriviaService) { }

  ngOnInit() {
  }

  getToken() {
    this.dataService.getToken().subscribe((tokenResponse: TokenResponse) => {
      this.token = tokenResponse.response_code === CONSTANTS.RESPONSE_CODES.Success ? tokenResponse.token : null;
      this.dataService.saveItem("api_token", this.token);
    });
  }

  resetToken() {
    this.dataService.resetToken().subscribe((tokenResponse: TokenResponse) => {
      this.token = tokenResponse.response_code === CONSTANTS.RESPONSE_CODES.Success ? tokenResponse.token : null;
      this.dataService.saveItem("api_token", this.token);
    });
  }

  getCategories() {
    this.triviaService.getCategories().subscribe(res => {
      this.categories = res ? res.trivia_categories : null;
    });
  }

  getQuestions() {
    if (this.categories && this.categories.length > 0) {
      this.categories.forEach(category => {
        this.triviaService.getApiCount(category.id).subscribe(res => {
          const numEasy = res.total_easy_question_count;
          const numMed = res.total_medium_question_count;
          const numHard = res.total_hard_question_count;

          let numRemainingEasy = numEasy;
          let numRemainingMed = numMed;
          let numRemainingHard = numHard;

          for (let i = 0;i < Math.ceil(numEasy / 50);i++) {
            this.triviaService.getQuestionByCategoryAndDifficulty(category.id, "easy", numRemainingEasy / 50 < 1 ? numEasy % 50 : 50).subscribe(res => {
              numRemainingEasy -= 50;
              switch(res.response_code) {
                case CONSTANTS.RESPONSE_CODES.Success: {
                  this.allQuestionsEasy = [this.allQuestionsEasy, ...res.results];
                  break;
                }
                case CONSTANTS.RESPONSE_CODES.No_Results: {
                  alert("No results");
                  break;
                }
                case CONSTANTS.RESPONSE_CODES.Invalid_Parameter: {
                  alert("Invalid parameters");
                  break;
                }
                case CONSTANTS.RESPONSE_CODES.Token_Not_Found: {
                  alert("Token not found");
                  break;
                }
                case CONSTANTS.RESPONSE_CODES.Token_Empty: {
                  alert("Token empty");
                  break;
                }
                default: {
                  break;
                }
              }
            });
          }

          for (let i = 0;i < Math.ceil(numMed / 50);i++) {
            this.triviaService.getQuestionByCategoryAndDifficulty(category.id, "medium", numRemainingMed / 50 < 1 ? numMed % 50 : 50).subscribe(res => {
              numRemainingMed -= 50;
              switch(res.response_code) {
                case CONSTANTS.RESPONSE_CODES.Success: {
                  this.allQuestionsMed = [this.allQuestionsMed, ...res.results];
                  break;
                }
                case CONSTANTS.RESPONSE_CODES.No_Results: {
                  alert("No results");
                  break;
                }
                case CONSTANTS.RESPONSE_CODES.Invalid_Parameter: {
                  alert("Invalid parameters");
                  break;
                }
                case CONSTANTS.RESPONSE_CODES.Token_Not_Found: {
                  alert("Token not found");
                  break;
                }
                case CONSTANTS.RESPONSE_CODES.Token_Empty: {
                  alert("Token empty");
                  break;
                }
                default: {
                  break;
                }
              }
            });
          }

          for (let i = 0;i < Math.ceil(numHard / 50);i++) {
            this.triviaService.getQuestionByCategoryAndDifficulty(category.id, "hard", numRemainingHard / 50 < 1 ? numHard % 50 : 50).subscribe(res => {
              numRemainingHard -= 50;
              switch(res.response_code) {
                case CONSTANTS.RESPONSE_CODES.Success: {
                  this.allQuestionsHard = [this.allQuestionsHard, ...res.results];
                  break;
                }
                case CONSTANTS.RESPONSE_CODES.No_Results: {
                  alert("No results");
                  break;
                }
                case CONSTANTS.RESPONSE_CODES.Invalid_Parameter: {
                  alert("Invalid parameters");
                  break;
                }
                case CONSTANTS.RESPONSE_CODES.Token_Not_Found: {
                  alert("Token not found");
                  break;
                }
                case CONSTANTS.RESPONSE_CODES.Token_Empty: {
                  alert("Token empty");
                  break;
                }
                default: {
                  break;
                }
              }
            });
          }

        })
      })
    }
  }

  exportToCsv() {
    const testData = [
      {"category":"History","type":"multiple","difficulty":"medium","question":"The Battle of the Somme in World War I took place in which country?","correct_answer":"France","incorrect_answers":["Germany","Italy","Austria"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"What ingredient is NOT used to craft a cake in Minecraft?","correct_answer":"Bread","incorrect_answers":["Wheat","Milk","Egg"]},{"category":"General Knowledge","type":"multiple","difficulty":"hard","question":"Which of the following languages does NOT use gender as a part of its grammar?","correct_answer":"Turkish","incorrect_answers":["German","Danish","Polish"]},{"category":"Science: Computers","type":"boolean","difficulty":"easy","question":"The NVidia GTX 1080 gets its name because it can only render at a 1920x1080 screen resolution.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"medium","question":"What type of cheese, loved by Wallace and Gromit, had it&#039;s sale prices rise after their successful short films?","correct_answer":"Wensleydale","incorrect_answers":["Cheddar","Moon Cheese","Edam"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"Which of the following colors does the Zombie eyes glow in the &quot;Nuketown&quot; map in &quot;Call of Duty: Black Ops II&quot; Zombies mode?","correct_answer":"Yellow and Blue","incorrect_answers":["Yellow and Red","Red and Blue","Blue and White"]},{"category":"Science: Mathematics","type":"boolean","difficulty":"medium","question":"You can square root a negative number with an imaginary number &quot;i&quot;.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Television","type":"multiple","difficulty":"medium","question":"&quot;The A Team&quot; first aired in the USA and in the UK in what year?","correct_answer":"1983","incorrect_answers":["1981","1985","1987"]},{"category":"Mythology","type":"multiple","difficulty":"medium","question":"According to Japanese folklore, what is the favorite food of the Kappa.","correct_answer":"Cucumbers","incorrect_answers":["Kabocha","Nasu","Soba"]},{"category":"Mythology","type":"multiple","difficulty":"hard","question":"Which Norse God has a horse named Sleipnir?","correct_answer":"Odin","incorrect_answers":["Thor","Frigg","Balder"]}
    ]
    const masterData = [this.allQuestionsEasy, ...this.allQuestionsMed, ... this.allQuestionsHard];
    masterData.forEach(q => {
      q.question = this.triviaService.formatUnicode(q.question);
    });

    const options = {
      filename: 'Trivia_Questions',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Trivia Questions',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    }

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(testData);
  }

}
