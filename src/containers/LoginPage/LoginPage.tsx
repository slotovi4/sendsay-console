import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from 'store';
import { Login, ILoginProps } from 'components';
import { authenticate } from 'src/store/actions/auth';

const LoginPage = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state: TRootState) => state.auth.loading);
	const loginError = useSelector((state: TRootState) => state.auth.error);
	
	console.log('loading', isLoading);

	const doLogin: ILoginProps['onLogin'] = (loginData) => {
		dispatch(authenticate(loginData));
	};

	return <Login onLogin={doLogin} loading={isLoading} loginError={loginError} />;
};

export default LoginPage;
