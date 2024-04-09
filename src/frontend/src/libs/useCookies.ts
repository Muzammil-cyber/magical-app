import { useState } from 'react';
import { UserIdType } from '../types/users';

const useCookies = () => {
    const [cookies, setCookies] = useState({});

    const getCookie = (name: string) => {
        const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
        return cookieValue ? cookieValue.pop() : '';
    };

    const setCookie = (name: string, value: string | number | UserIdType, days: number = 1) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
        setCookies({ ...cookies, [name]: value });
    };

    return { cookies, getCookie, setCookie };
};

export default useCookies;