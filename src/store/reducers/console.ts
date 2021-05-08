import { handleActions, Action } from 'redux-actions';
import { ActionTypes } from 'src/store/constants';

const initialState: IInitialState = {
	loading: false,
	response: null,
	requestHistory: null
};

const isEquivalentPayload = (a: IHistoryRequest['payload'], b: IHistoryRequest['payload']) => {
	const aPropsList = Object.getOwnPropertyNames(a);
	const bPropsList = Object.getOwnPropertyNames(b);

	if (aPropsList.length !== bPropsList.length) {
		return false;
	}

	for (let i = 0; i < aPropsList.length; i++) {
		const propName = aPropsList[i];

		if (a[propName] !== b[propName]) {
			return false;
		}
	}

	return true;
};

export default {
	console: handleActions<IInitialState, TCombinedPayloads>(
		{
			[ActionTypes.REQUEST]: (state): IInitialState => {
				return {
					...state,
					loading: true,
				};
			},
			[ActionTypes.REQUEST_IS_DONE]: (state, { payload }: Action<IHistoryRequest>): IInitialState => {
				const equalRequest = state.requestHistory?.find(e => isEquivalentPayload(e.payload, payload.payload));

				if (!equalRequest) {
					return {
						...state,
						loading: false,
						response: payload.response,
						requestHistory: [payload, ...(state.requestHistory || [])]
					};
				} else {
					return {
						...state,
						loading: false,
						response: payload.response,
						requestHistory: [equalRequest, ...(state.requestHistory?.filter(e => e.id !== equalRequest.id) || [])]
					};
				}
			},
		},
		initialState
	),
};

export interface IHistoryRequest {
	action: string;
	success: boolean;
	response: string;
	id: string;
	readonly payload: {[key: string]: unknown};
}

interface IInitialState {
	loading: boolean;
	response: string | null;
	requestHistory: IHistoryRequest[] | null;
}

type TCombinedPayloads = IHistoryRequest;