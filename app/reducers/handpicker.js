import * as types from '../actions/types';
import _ from 'lodash';
import utils from '../utils/utils';

const defaultState = {
    mode: 'single',
    single: '',
    range: ''
};

const equities = (state = defaultState, action) => {
    const _copy = _.cloneDeep(state);
    switch (action.type) {
        case types.CHANGE_HANDPICKER_MODE:
            return { ..._copy,  mode: action.mode};
        case types.ADD_CARD:
            _copy[action.mode] = _copy[action.mode] + action.card;
            return _copy;
        case types.REMOVE_CARD:
            _copy[action.mode] = _copy[action.mode].replace(action.card, '');
            return _copy;
        case types.CLOSE_MODAL:
            return defaultState;
        case types.OPEN_MODAL:
            console.log(action);
            if (utils.isRange(action.data.cards[action.data.street])) {
                _copy.range = action.data.cards[action.data.street];
                _copy.mode = 'range';
            } else {
                _copy.single = action.data.cards[action.data.street];
                _copy.mode = 'single';
            }
            return _copy;
        case types.CLEAR_CARDS:
            _copy[action.mode] = '';
            return _copy;
        case types.CLEAR_BOARD:
            return defaultState;
        default:
            return state;
    }
};


export default equities;
