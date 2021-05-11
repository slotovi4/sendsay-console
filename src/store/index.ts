import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer, consoleReducer } from 'src/store/reducers';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import rootSaga from 'src/store/sagas';

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
	key: 'root',
	storage,
};

const auth = persistReducer(persistConfig, authReducer.auth);
const console = persistReducer(persistConfig, consoleReducer.console);
const combine = combineReducers({
	auth,
	console
});

const bindMiddleware = (middleware: Array<typeof sagaMiddleware>) => {
	if (process.env.NODE_ENV !== 'production') {
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(...middleware);
};

const initialState = {};

// export const configureStore = () => {
// 	// const initialState = {};
// 	const store = createStore(
// 		combine,
// 		initialState,
// 		bindMiddleware([sagaMiddleware]),
// 	);
// 	const persistor = persistStore(store);
// 	// const updateStore: IStore = store;

// 	sagaMiddleware.run(rootSaga);

// 	// store.runSagaTask = () => {
// 	// 	store.sagaTask = sagaMiddleware.run(rootSaga);
// 	// };

// 	// store.runSagaTask();

// 	return {
// 		store,
// 		persistor,
// 	};
// };

export const store = createStore(
	combine,
	initialState,
	bindMiddleware([sagaMiddleware]),
);
// export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type TRootState = ReturnType<typeof combine>;

// export default configureStore;

// interface IStore extends Store {
// 	runSagaTask: () => void;
// }
