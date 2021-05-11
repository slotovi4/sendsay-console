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
				const equalRequest = state.requestHistoryList?.find(request => request.id === payload.id);
				let newRequestHistoryList: IHistoryRequest[] = [];

				if(!equalRequest) {
					newRequestHistoryList = [payload, ...(state.requestHistoryList || [])];
				} else {
					newRequestHistoryList = [equalRequest, ...(state.requestHistoryList?.filter(request => request.id !== equalRequest.id) || [])];
				}

				saveHistoryRequestList(newRequestHistoryList);

				return {
					...state,
					loading: false,
					response: payload.responseData,
					requestHistoryList: newRequestHistoryList
				};
			},
			[ActionTypes.REQUEST_DELETE]: (state, { payload: deletedRequestId }: Action<IHistoryRequest['id']>): IInitialState => {
				const newRequestHistoryList = state.requestHistoryList?.filter(request => request.id !== deletedRequestId) || [];

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
	id: string;
	responseData: string;
	requestData: string;
}

interface IInitialState {
	loading: boolean;
	response: string | null;
	requestHistoryList: IHistoryRequest[] | null;
}

type TCombinedPayloads = IHistoryRequest | IHistoryRequest['id'];