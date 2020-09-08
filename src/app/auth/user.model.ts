import { of } from 'rxjs';

export class User {
    constructor(
        public id: number,
        public email: string
    ) {}
}

export interface UserData {
    id: number,
    email: string,
    token: string
}
