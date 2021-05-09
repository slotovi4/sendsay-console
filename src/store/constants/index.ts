/* eslint-disable @typescript-eslint/naming-convention */
import keyMirror from 'fbjs/lib/keyMirror';

export const ActionTypes = keyMirror({
	AUTHENTICATE: undefined,
	AUTHENTICATE_CHECK: undefined,
	AUTHENTICATE_CHECK_SUCCESS: undefined,
	AUTHENTICATE_SUCCESS: undefined,
	AUTHENTICATE_FAILURE: undefined,
	REQUEST: undefined,
	REQUEST_IS_DONE: undefined,
	REQUEST_DELETE: undefined,
	LOGOUT: undefined,
	LOGOUT_SUCCESS: undefined,
	LOGOUT_FAILURE: undefined,
});
