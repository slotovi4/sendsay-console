import { createAction } from 'redux-actions';
import { ActionTypes } from 'src/store/constants';

// export const { authenticate, authenticateSuccess, authenticateCheck, authenticateFailure, logout } = createActions<ISendsayAuth>({
// 	[ActionTypes.AUTHENTICATE]: (payload: ISendsayAuth) => payload,
// 	[ActionTypes.AUTHENTICATE_CHECK]: (payload: ISendsayAuth) => payload,
// 	[ActionTypes.AUTHENTICATE_SUCCESS]: (payload: ISendsayAuth) => payload,
// 	[ActionTypes.AUTHENTICATE_FAILURE]: (payload: ISendsayAuth) => payload,
// 	[ActionTypes.LOGOUT]: (payload: ISendsayAuth) => payload,
// });

export const authenticate = createAction<ISendsayAuth>(ActionTypes.AUTHENTICATE);
export const authenticateSuccess = createAction<ISendsaySuccess>(ActionTypes.AUTHENTICATE_SUCCESS);
export const authenticateCheckSuccess = createAction<ISendsayAuthCheck>(ActionTypes.AUTHENTICATE_CHECK_SUCCESS);
export const authenticateCheck = createAction(ActionTypes.AUTHENTICATE_CHECK);
export const authenticateFailure = createAction<ISendsayError>(ActionTypes.AUTHENTICATE_FAILURE);
export const logout = createAction(ActionTypes.LOGOUT);
