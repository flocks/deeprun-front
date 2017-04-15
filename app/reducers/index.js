import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import modals from './modals';
import cards from './cards';
import equities from './equities';


const rootReducer = combineReducers({
    modals,
    cards,
    equities,
    routing
});

export default rootReducer;
