export class Team {
    name: string;
    members: string[];
    score: number;

    constructor(name: string, members: string[], score: number) {
        this.name = name;
        this.members = members;
        this.score = score;
    }
}