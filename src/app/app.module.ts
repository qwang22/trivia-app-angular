import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TriviaComponent } from './components/trivia/trivia.component';
import { TeamGeneratorComponent } from './components/team-generator/team-generator.component';
import { TriviaCardComponent } from './components/trivia-card/trivia-card.component';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GameboardComponent } from './components/gameboard/gameboard.component';
import { TeamScoreComponent } from './components/team-score/team-score.component';
import { HeaderComponent } from './components/header/header.component';
import { DataScraperComponent } from './components/data-scraper/data-scraper.component';

@NgModule({
  declarations: [
    AppComponent,
    TriviaComponent,
    TeamGeneratorComponent,
    TriviaCardComponent,
    GameboardComponent,
    TeamScoreComponent,
    HeaderComponent,
    DataScraperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
