import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginPage } from 'containers';

const UnAuthorizedRoutes = () => {
	return (
		<Switch>
			<Route path="/" component={LoginPage} />
		</Switch>
	);
};

export default UnAuthorizedRoutes;
