import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-team-score',
  templateUrl: './team-score.component.html',
  styleUrls: ['./team-score.component.css']
})
export class TeamScoreComponent implements OnInit {

  //@Input() 
  teams: any[];
  score: number;
  @Input()
  team: Team;
  
  constructor() {
    this.score = 0;
   }

  ngOnInit() {
    console.log(this.team)
  }

  addPoints(points: number) {

  }

  subtractPoints(points: number) {
    
  }

}
