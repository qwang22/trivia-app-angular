export class TokenResponse {
    response_code: number;
    response_message: string;
    token: string;

    constructor(json: any) {
        this.response_code = json.response_code;
        this.response_message = json.response_message;
        this.token = json.token;
    }
}