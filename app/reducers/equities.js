import * as types from '../actions/types';

const defaultState = {
    player1: null,
    player2: null,
    isloading: false
};

const equities = (state = defaultState, action) => {
    switch (action.type) {
        case types.START_EQUITIES:
            return {defaultState, isLoading: true};
        case types.GOT_EQUITIES:
            return {defaultState, player1: action.player1, player2: action.player2};
        case types.ERROR_EQUITIES:
            return defaultState;
        case types.CLEAR_PLAYER:
        case types.CLEAR_FLOP:
        case types.CLEAR_TURN:
        case types.CLEAR_RIVER:
        case types.CLEAR_BOARD:
            return defaultState;
        default:
            return state;
    }
};


export default equities;
