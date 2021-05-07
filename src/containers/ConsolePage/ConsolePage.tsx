import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from 'store';
import { Console } from 'components';
import { logout, authenticateCheck } from 'src/store/actions/auth';

const ConsolePage = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state: TRootState) => state.auth.loading);
	const subLogin = useSelector((state: TRootState) => state.auth.sublogin);

	console.log('loading', isLoading);

	useEffect(() => {
		dispatch(authenticateCheck());
	}, []);

	const doLogout = () => {
		dispatch(logout());
	};

	return <Console onLogout={doLogout} subLogin={subLogin} />;
};

export default ConsolePage;
