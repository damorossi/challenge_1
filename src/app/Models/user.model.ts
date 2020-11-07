import { BaseModel } from './base-model';

export class User extends BaseModel {
    name?: string;
    job?: string;
}

export class FullUser extends User {
    // tslint:disable-next-line: variable-name
    first_name: string;
    // tslint:disable-next-line: variable-name
    last_name: string;
    avatar?: string;
    email?: string;
}