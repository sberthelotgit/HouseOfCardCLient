import type { ICreateUser, ILoginUser } from "../model/user";

const authEndpoint = 'http://192.168.2.63:5000/auth';


export const login = (user: ILoginUser): Promise<{ accessToken: string }> => {
    return fetch(`${authEndpoint}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
}

export const register = (user: ICreateUser) => {
    return fetch(`${authEndpoint}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
}