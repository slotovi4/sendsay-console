import { all, put, call, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from 'src/store/constants';
import { setSession, clearSession, getSession } from 'cookie';
import { 
	authenticateSuccess, 
	authenticateFailure, 
	authenticateCheckSuccess,
} from 'actions';
import api from 'src/helpers/sendsay';

export function* authenticateCheckSaga() {
	let subLogin: string | null = null;

	try {
		yield api.sendsay.request({
			action: 'pong',
		}).then((e: any) => {
			subLogin = e.sublogin;
		});
	} catch (error) {
		if (error.id === 'error/auth/failed') {
			yield call(logoutSaga);
		}
	}

	if (subLogin) {
		yield put(authenticateCheckSuccess({ subLogin }));
	}
}

export function* authenticateSaga({ payload }: IAuthenticateSagaProps) {
	let error: ISendsayError | null = null;

	yield api.sendsay
		.login({
			login: payload.login,
			sublogin: payload.sublogin,
			password: payload.password,
		})
		.then(() => {
			setSession(api.sendsay.session);
		})
		.catch((err: ISendsayError) => {
			clearSession();

			error = {
				id: err.id,
				explain: err.explain
			};

			console.log('err', err);
		});

	if (getSession()) {
		yield put(
			authenticateSuccess({
				sessionKey: api.sendsay.session,
				login: payload.login,
				sublogin: payload.sublogin,
			})
		);
	} else if (error) {
		yield put(authenticateFailure(error));
	}
}

export function* logoutSaga() {
	clearSession();
}

export default function* root() {
	yield all([
		takeLatest(ActionTypes.AUTHENTICATE, authenticateSaga),
		takeLatest(ActionTypes.AUTHENTICATE_CHECK, authenticateCheckSaga),
		takeLatest(ActionTypes.LOGOUT, logoutSaga),
	]);
}

interface IAuthenticateSagaProps {
	payload: ISendsayAuth;
	type: typeof ActionTypes;
}
