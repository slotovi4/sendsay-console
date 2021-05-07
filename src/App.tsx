import React from 'react';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RootRoute } from './routes';
import { store } from 'store';

const App = () => {
	return (
		<Router>
			<Provider store={store}>
				{/* <PersistGate loading={null} persistor={persistor}> */}
					<RootRoute />
				{/* </PersistGate> */}
			</Provider>
		</Router>
	);
};

export default App;
