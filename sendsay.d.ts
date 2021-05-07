
declare module 'sendsay-api' {
	export default class Sendsay {
		public setSessionFromCookie: ISendsayMethods['setSessionFromCookie'];
		public request: ISendsayMethods['request'];
		public login: ISendsayMethods['login'];

		public session: ISendsayData['session'];

		public constructor(props?: ISendsayProps);
	}
}

interface ISendsayProps {
	apiUrl?: string;
	apiKey?: string;
	auth?: ISendsayAuth;
}

interface ISendsayAuth {
	login: string;
	sublogin?: string;
	password: string;
}

interface ISendsayAuthCheck {
	subLogin: string;
}

interface ISendsaySuccess extends Omit<ISendsayAuth, 'password'> {
	sessionKey: string;
}

interface ISendsayError {
	explain: string;
	id: string;
}

interface ISendsayMethods {
	setSessionFromCookie: (session?: string) => void;
	request: (data: ISendsayRequestProps) => Promise<unknown>;
	login: (data: ISendsayAuth) => Promise<unknown>;
}

interface ISendsayData {
	session: string;
}

interface ISendsayRequestProps {
	action: string;
}