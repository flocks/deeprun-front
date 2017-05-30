import * as types from '../actions/types';
import _ from 'lodash';

export const defaultState = {
    player1: '',
    player2: '',
    player3: '',
    player4: '',
    flop: '',
    turn: '',
    river: ''
};

const cards = (state = defaultState, action) => {
    switch (action.type) {
        case types.VALID_CARDS_SELECTION:
            const _cards = _.cloneDeep(state);
            _cards[action.street] = action.cards;
            return _cards;
        case types.CLEAR_BOARD:
            return defaultState;
        default:
            return state;
    }
};


export default cards;
