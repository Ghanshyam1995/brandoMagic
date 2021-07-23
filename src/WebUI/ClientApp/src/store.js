import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { persistStore } from "redux-persist";
import { loadingBarMiddleware } from 'react-redux-loading-bar'

const enhancers = [];
const middleware = [
    thunk
];

const windowIfDefined = typeof window === 'undefined' ? null : window;
if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
}


const initialStore = {
    user: {},
    brands: [],
    category: []
}
const store = createStore(
    rootReducer,
    initialStore,
    compose(applyMiddleware(...middleware), ...enhancers)
);

const persistor = persistStore(store);
export default { store, persistor };