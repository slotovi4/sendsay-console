import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from 'store';
import { Console } from 'components';
import { logout, authenticateCheck, request } from 'actions';

const ConsolePage = () => {
	const dispatch = useDispatch();
	const subLogin = useSelector((state: TRootState) => state.auth.sublogin);
	const isRequestLoading = useSelector((state: TRootState) => state.console.loading);
	const response = useSelector((state: TRootState) => state.console.response);
	const requestHistoryList = useSelector((state: TRootState) => state.console.requestHistory);

	useEffect(() => {
		dispatch(authenticateCheck());
	}, []);

	const doLogout = () => {
		dispatch(logout());
	};

	const doRequest = (data: ISendsayRequestProps) => {
		dispatch(request(data));
	};

	return (
		<Console
			isRequestLoading={isRequestLoading}
			onLogout={doLogout}
			subLogin={subLogin}
			onRequest={doRequest}
			response={response}
			requestHistoryList={requestHistoryList}
		/>
	);
};

export default ConsolePage;
