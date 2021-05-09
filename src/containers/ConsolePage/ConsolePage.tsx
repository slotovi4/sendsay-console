import React, { useEffect } from 'react';
import { 
	logout, 
	authenticateCheck, 
	request, 
	requestDelete,
	requestClearHistory
} from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from 'store';
import { Console } from 'components';
import { IHistoryRequest } from 'reducers';

const ConsolePage = () => {
	const dispatch = useDispatch();
	const subLogin = useSelector((state: TRootState) => state.auth.sublogin);
	const isRequestLoading = useSelector((state: TRootState) => state.console.loading);
	const response = useSelector((state: TRootState) => state.console.response);
	const requestHistoryList = useSelector((state: TRootState) => state.console.requestHistoryList?.map(e => ({...e, payload: JSON.stringify(e.payload)})) || null);

	useEffect(() => {
		dispatch(authenticateCheck());
	}, []);

	const doLogout = () => {
		dispatch(logout());
	};

	const doRequest = (data: ISendsayRequestProps) => {
		dispatch(request(data));
	};

	const deleteRequest = (id: IHistoryRequest['id']) => {
		dispatch(requestDelete(id));
	};
	
	const onClearHistory = () => {
		dispatch(requestClearHistory());
	};

	return (
		<Console
			isRequestLoading={isRequestLoading}
			onLogout={doLogout}
			subLogin={subLogin}
			onRequest={doRequest}
			response={response}
			requestHistoryList={requestHistoryList}
			onDeleteRequestHistory={deleteRequest}
			onClearHistory={onClearHistory}
		/>
	);
};

export default ConsolePage;
