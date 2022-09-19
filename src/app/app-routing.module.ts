import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TriviaComponent } from './components/trivia/trivia.component';
import { TeamGeneratorComponent } from './components/team-generator/team-generator.component';
import { DataScraperComponent } from './components/data-scraper/data-scraper.component';


const routes: Routes = [
  {
    path: "trivia",
    component: TriviaComponent
  },
  {
    path: "team-generator",
    component: TeamGeneratorComponent
  },
  {
    path: "data-scraper",
    component: DataScraperComponent
  },
  {
    path: '',
    component: DataScraperComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
