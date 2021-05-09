import { handleActions, Action } from 'redux-actions';
import { ActionTypes } from 'src/store/constants';
import { getSession } from 'cookie';

const initialState: IInitialState = {
	loading: false,
	sessionKey: getSession() || null,
	login: null,
	sublogin: null,
	error: null,
};

export default {
	auth: handleActions<IInitialState, TCombinedPayloads>(
		{
			[ActionTypes.AUTHENTICATE]: (state): IInitialState => {
				return {
					...state,
					loading: true,
				};
			},
			[ActionTypes.AUTHENTICATE_SUCCESS]: (state, { payload }: Action<ISendsaySuccess>): IInitialState => {
				return {
					...state,
					loading: false,
					sessionKey: payload?.sessionKey || null,
					login: payload?.login || null,
					sublogin: payload?.sublogin || null,
				};
			},
			[ActionTypes.AUTHENTICATE_CHECK_SUCCESS]: (state, { payload }: Action<ISendsayAuthCheck>): IInitialState => {
				return {
					...state,
					sublogin: payload.subLogin
				};
			},
			[ActionTypes.AUTHENTICATE_FAILURE]: (state, { payload }: Action<ISendsayError>): IInitialState => {
				return {
					...state,
					loading: false,
					error: payload,
				};
			},
			[ActionTypes.LOGOUT]: (): IInitialState => {
				return {
					...initialState,
					sessionKey: null,
				};
			},
		},
		initialState
	),
};

interface IInitialState {
	loading: boolean;
	sessionKey: string | null;
	login: string | null;
	sublogin: string | null;
	error: ISendsayError | null;
}

type TCombinedPayloads = ISendsayError | ISendsaySuccess | ISendsayAuthCheck;