import { handleActions, Action } from 'redux-actions';
import { ActionTypes } from 'src/store/constants';
import { 
	saveHistoryRequestList, 
	getRequestHistoryList, 
	clearRequestHistoryList 
} from '../localStore';

const initialState: IInitialState = {
	loading: false,
	response: null,
	requestHistoryList: getRequestHistoryList(),
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
				const equalRequest = state.requestHistoryList?.find(e => isEquivalentPayload(e.payload, payload.payload));

				if (!equalRequest) {
					const newRequestHistoryList = [payload, ...(state.requestHistoryList || [])];

					saveHistoryRequestList(newRequestHistoryList);

					return {
						...state,
						loading: false,
						response: payload.response,
						requestHistoryList: newRequestHistoryList
					};
				} else {
					const newRequestHistoryList = [equalRequest, ...(state.requestHistoryList?.filter(e => e.id !== equalRequest.id) || [])];

					saveHistoryRequestList(newRequestHistoryList);

					return {
						...state,
						loading: false,
						response: payload.response,
						requestHistoryList: newRequestHistoryList
					};
				}
			},
			[ActionTypes.REQUEST_DELETE]: (state, { payload }: Action<IHistoryRequest['id']>): IInitialState => {
				const newRequestHistoryList = [...(state.requestHistoryList?.filter(e => e.id !== payload) || [])];

				saveHistoryRequestList(newRequestHistoryList);

				return {
					...state,
					requestHistoryList: newRequestHistoryList
				};
			},
			[ActionTypes.REQUEST_CLEAR_HISTORY]: (state): IInitialState => {
				clearRequestHistoryList();

				return {
					...state,
					requestHistoryList: null
				};
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
	readonly payload: { [key: string]: unknown };
}

interface IInitialState {
	loading: boolean;
	response: string | null;
	requestHistoryList: IHistoryRequest[] | null;
}

type TCombinedPayloads = IHistoryRequest | IHistoryRequest['id'];