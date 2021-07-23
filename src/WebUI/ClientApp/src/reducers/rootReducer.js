import { combineReducers } from 'redux';
import brandsReducer from './brandsReducer';
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loadingBarReducer } from 'react-redux-loading-bar';

const persistConfig = {
    key: 'bm_root',
    storage,
    whitelist: ['user', 'category', 'brands']
}

const rootReducer = combineReducers({
    brands: brandsReducer,
    user: userReducer,
    category: categoryReducer,
    loadingBar: loadingBarReducer
});

export default persistReducer(persistConfig, rootReducer);