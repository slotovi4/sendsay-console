import { all, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from 'src/store/constants';
import { requestSuccess } from 'actions';
import api from 'src/helpers/sendsay';

const createUniqueId = (data: string) => data.split('').sort().join('');

export function* sagaRequest({ payload }: IRequestSagaProps) {
	let response: string | null = null;
	let success = false;

	try {
		yield api.sendsay.request({
			action: payload.action,
			id: payload.id
		}).then((e: unknown) => {
			response = JSON.stringify(e);
			success = true;
		});
	} catch (error) {
		response = JSON.stringify(error);
		success = false;
	}

	const objectForId = `${JSON.stringify(payload)}${response}`;

	if (response) {
		yield put(requestSuccess({
			response,
			success,
			action: payload.action,
			payload: { ...payload },
			id: createUniqueId(objectForId)
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
