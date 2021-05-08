import { createAction } from 'redux-actions';
import { ActionTypes } from 'src/store/constants';
import { IHistoryRequest } from 'reducers';

export const request = createAction<ISendsayRequestProps>(ActionTypes.REQUEST);
export const requestSuccess = createAction<IHistoryRequest>(ActionTypes.REQUEST_IS_DONE);