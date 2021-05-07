
import { getCookie } from './getCookie';

const sessionCookieKey = 'sendsay_session';

export const setSession = (session: string) => {
	document.cookie = `${sessionCookieKey}=${session}`;
};

export const clearSession = () => {
	document.cookie = `${sessionCookieKey}=`;
};

export const getSession = () => {
	return getCookie(sessionCookieKey);
};