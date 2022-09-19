import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trivia-app-angular';
  showTeamsPanel: boolean = false;


  toggleTeamPanel() {
    this.showTeamsPanel = !this.showTeamsPanel;
  }
}
