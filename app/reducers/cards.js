import * as types from '../actions/types';
import _ from 'lodash';

let _cards;

export const defaultState = {
    player1: [],
    player2: [],
    player3: [],
    player4: [],
    flop: [],
    turn: {},
    river: {}
};

const cards = (state = defaultState, action) => {
    switch (action.type) {
        case types.ADD_CARD:
            _cards = _.cloneDeep(state);

            if (action.street !== 'turn' && action.street !== 'river') {
                if (_.isUndefined(_cards[action.street])) {
                    _cards[action.street] = [action.card];
                } else {
                    if (action.street === 'flop' && _cards[action.street].length < 3) {
                        _cards[action.street].push(action.card);
                    } else if (action.street !== 'flop' && _cards[action.street].length < 2) {
                        _cards[action.street].push(action.card);
                    }
                }
            } else {
                _cards[action.street] = action.card;
            }


            return _cards;
        case types.REMOVE_CARD:
            _cards = _.cloneDeep(state);
            if (action.street === 'turn' || action.street === 'river') {
                _cards[action.street] = {};
            } else {
                _.remove(_cards[action.street], (card) => {
                    return (card.rank === action.card.rank && card.suit === action.card.suit);
                });
            }
            return _cards;
        case types.CLEAR_PLAYER:
            if (action.player === 'player1') {
                return {...state, player1: []};
            }
            if (action.player === 'player2') {
                return {...state, player2: []};
            }
            if (action.player === 'player3') {
                return {...state, player3: []};
            }

            return {...state, player4: []};
        case types.CLEAR_FLOP:
            return {...state, flop: []};
        case types.CLEAR_TURN:
            return {...state, turn: {}};
        case types.CLEAR_RIVER:
            return {...state, river: {}};
        case types.CLEAR_BOARD:
            return defaultState;

        default:
            return state;
    }
};


export default cards;
