import { all, fork } from 'redux-saga/effects';
import login from 'src/store/sagas/auth';

export default function* rootSaga() {
	yield all([fork(login)]);
}
