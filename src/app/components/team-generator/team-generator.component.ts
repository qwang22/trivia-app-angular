import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../../services/trivia.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { Team } from 'src/app/models/team.model';
import { CONSTANTS } from 'src/assets/constants';

@Component({
  selector: 'app-team-generator',
  templateUrl: './team-generator.component.html',
  styleUrls: ['./team-generator.component.css']
})
export class TeamGeneratorComponent implements OnInit {

  playersList: any[] = [
    { name: "Player 1" },
    { name: "Player 2" },
    { name: "Player 3" },
    { name: "Player 4" }
  ]
  teamsList: any[] = [
    { name: "Team 1" },
    { name: "Team 2" }
  ]

  isEditModePlayer: boolean = false;
  isEditModeTeam: boolean = false;

  areTeamsGenerated: boolean;
  teams: any[];
  /* structure for teams
  [
    {
      teamName: "Team 1",
      players: [
        { name: "Player 1"}
      ]
    }
  ]
  */

  constructor(private triviaService: TriviaService, private dataService: DataStorageService) {
    this.teams = this.dataService.getItem(CONSTANTS.STORAGE_KEYS.Teams) || [];
    this.areTeamsGenerated = this.teams.length > 0 ? true : false;
   }

  ngOnInit() {
  }

  addPlayer() {
    this.playersList.push({ name: "" });
  }

  addTeam() {
    this.teamsList.push({ name: "" });
  }

  removePlayer(i: number) {
    this.playersList.splice(i, 1);
  }

  removeTeam(i: number) {
    this.teamsList.splice(i, 1);
  }

  onEditClosePlayers() {
    this.isEditModePlayer = !this.isEditModePlayer;
  }

  onEditCloseTeams() {
    this.isEditModeTeam = !this.isEditModeTeam;
  }

  generateTeams() {
    if (this.playersList.length > this.teamsList.length) {
      this.teams = [];
      const numTeams = this.teamsList.length;
      const numPlayers = this.playersList.length;

      const players = this.playersList.slice();
      this.playersList = this.shuffle(players);
      const middleIndex = Math.ceil(this.playersList.length / numTeams);
      
      const playersListCopy1 = this.playersList.slice(); //copy of array
      const playersListCopy2 = this.playersList.slice();

      this.areTeamsGenerated = true;
      
      //assuming # of teams is 2
      this.teamsList.forEach((t, i) => {
        const team: Team = new Team(t.name, (i === 0 ? playersListCopy1.splice(0, middleIndex) : playersListCopy2.splice(middleIndex, numPlayers)), 0);
        this.teams.push(team);
      });
      this.triviaService.saveTeams(this.teams);
      this.dataService.saveItem(CONSTANTS.STORAGE_KEYS.Teams, this.teams);
    }
  }

  shuffle(list): any {
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

}
