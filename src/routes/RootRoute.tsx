import React from 'react';
import { useSelector } from 'react-redux';
import { TRootState } from 'store';
import UnAuthorizedRoutes from './UnAuthorizedRoutes';
import AuthorizedRoutes from './AuthorizedRoutes';

const RootRoute = () => {
	const isLoggedIn = useSelector((state: TRootState) => !!state.auth.sessionKey?.length);

	return (
		<>
			{isLoggedIn ? (
				<AuthorizedRoutes />
			) : (
				<UnAuthorizedRoutes />
			)}
		</>
	);
};

export default RootRoute;
