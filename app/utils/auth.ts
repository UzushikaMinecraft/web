import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/server-runtime";
import fetch from "node-fetch";

export interface Token {
    expires_at: number;
}

export const getCookieValue = (request: Request, key: string) => {
    const cookie = request.headers.get('Cookie');
    if (!cookie) return null;
    const cookieValue = cookie.split(';').find(c => c.startsWith(key));
    if (!cookieValue) return null;
    return cookieValue.split('=')[1];
}

export const getToken = (request: Request) => {
    return getCookieValue(request, 'token');
}

export const isAuthenticated = (request: Request) => {
    return !!getToken(request);
}

export const isTokenValid = async (token: string) => {
    const response = await fetch('http://uzsk.iamtakagi.net/api/auth/token', {
        headers: {
            'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        }
    });
    const data = await response.json() as Token;
    if (response.status !== 200) {
        return false;
    }
    if(data.expires_at < Date.now()) {
        return false;
    }
    return true;
}