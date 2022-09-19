import { CONSTANTS } from 'src/assets/constants'

export class Category {
    id: number;
    name: string;

    constructor(category: string) {
        this.name = category;
        this.id = CONSTANTS.CATEGORIES_DICT[category];
    }
}