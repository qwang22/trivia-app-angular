export class CONSTANTS {

    public static readonly CATEGORY = {
        Gen_Knowledge : "General Knowledge",
        Ent_Books : "Entertainment: Books",
        Ent_Film: "Entertainment: Film",
        Ent_Music : "Entertainment: Music",
        Ent_Music_and_Theatre : "Entertainment: Musicals & Theatres",
        Ent_Tele : "Entertainment: Television",
        Ent_Video_Games : "Entertainment: Video Games",
        Ent_Board_Games : "Entertainment: Board Games",
        Ent_Comics : "Entertainment: Comics",
        Ent_Anime : "Entertainment: Japanese Anime & Manga",
        Ent_Cartoon : "Entertainment: Cartoon & Animations",
        Science_and_Nature : "Science & Nature",
        Science_Comp : "Science: Computers",
        Science_Math : "Science: Mathematics",
        Science_Gadges : "Science: Gadgets",
        Mythology : "Mythology",
        Sports : "Sports",
        Geography : "Geography",
        History : "History",
        Politics : "Politics",
        Art : "Art",
        Celebrities : "Categories",
        Animals : "Animals",
        Vehicles : "Vehicles",
    }

    public static readonly CATEGORIES_DICT = {
        "General Knowledge": 9,
        "Entertainment: Books": 10,
        "Entertainment: Comics": 29,
        "Entertainment: Cartoon & Animations": 32,
        "Entertainment: Film": 11,
        "Entertainment: Japanese Anime & Manga": 31,
        "Entertainment: Music": 12,
        "Entertainment: Musicals & Theatres": 13,
        "Entertainment: Television": 14,
        "Entertainment: Board Games": 16,
        "Entertainment: Video Games": 15,
        "Science & Nature": 17,
        "Science: Computers": 18,
        "Science: Gadgets": 30,
        "Science: Mathematics": 19,
        "Mythology": 20,
        "Sports": 21,
        "Geography": 22,
        "History": 23,
        "Politics": 24,
        "Art": 25,
        "Celebrities": 26,
        "Animals": 27,
        "Vehicles": 28,
        
    }

    public static readonly POINTS_DICT = {
        "easy": 100,
        "medium": 200,
        "hard": 300
    }

    public static readonly UNICODE_DICT = {
        "&#039;" : "'",
        "&quot;" : "\"",
        "&amp;" : "&",
        "&rsquo;" : "'",
        "&hellip;" : "...",
        "&rdquo;" : "\"",
        "&ldquo;" : "\""
    }

    public static readonly STORAGE_KEYS = {
        Questions: "questions",
        Teams: "teams",
        CurrentTeamIndex: "currentTeamIndex",
        NumQuestionsRemaining: "numQuestionsRemaining"
    }

    public static readonly DROPDOWN_SETTINGS = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'Unselect All',
        itemsShowLimit: 24,
        allowSearchFilter: true
    }
    
    public static readonly RESPONSE_CODES = {
        Success: 0,
        No_Results: 1,
        Invalid_Parameter: 2,
        Token_Not_Found: 3,
        Token_Empty: 4
    }
}