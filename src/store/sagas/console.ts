import { all, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from 'src/store/constants';
import { requestSuccess } from 'actions';
import api from 'src/helpers/sendsay';

const createUniqueId = (data: string) => data.split('').sort().join('');

export function* sagaRequest({ payload }: IRequestSagaProps) {
	let responseData: string | null = null;
	let success = false;

	try {
		yield api.sendsay.request({
			action: payload.action,
			id: payload.id
		}).then((response: unknown) => {
			responseData = JSON.stringify(response);
			success = true;
		});
	} catch (error) {
		responseData = JSON.stringify(error);
		success = false;
	}

	if (responseData) {
		const requestData = JSON.stringify(payload);

		yield put(requestSuccess({
			success,
			action: payload.action,
			responseData,
			requestData,
			id: createUniqueId(requestData)
		}));
	}
}

export default function* root() {
	yield all([
		takeLatest(ActionTypes.REQUEST, sagaRequest),
	]);
}

interface IRequestSagaProps {
	payload: ISendsayRequestProps;
	type: typeof ActionTypes;
}
