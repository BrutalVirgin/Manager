export enum EUsersRole {
    administrator = 'administrator',
    boss = 'boss',
    user = 'user'
}

export interface IAuth {
    jwt: string,
    expiresIn: number
}

export interface IAuthJwt {
    userId: string;
    exp: number;
}
