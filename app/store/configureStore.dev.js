import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import thunkMiddleware from 'redux-thunk';


export default function configureStore() {
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunkMiddleware),
            DevTools.instrument()
        )
    );

    return store;
}
