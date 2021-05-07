import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConsolePage, NotFoundPage } from 'containers';

const AuthorizedRoutes = () => {
	return (
		<Switch>
			<Redirect exact path="/" to="/console" />
			
			<Route path="/console" component={ConsolePage} />
			<Route path="*" component={NotFoundPage} />
		</Switch>
	);
};

export default AuthorizedRoutes;
