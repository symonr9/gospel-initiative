// store.js
import { configureStore , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root'; // Import your rootReducer

const store = configureStore(rootReducer, applyMiddleware(thunk));

export default store;