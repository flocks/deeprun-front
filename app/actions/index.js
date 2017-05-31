import * as types from './types';
import utils from '../utils/utils';
import request from 'superagent';
import _ from 'lodash';

export function switchHandpickerMode(mode) {
    return {
        type: types.CHANGE_HANDPICKER_MODE,
        mode: mode
    };
}

export function openModal(modalId, data) {
    return {
        type: types.OPEN_MODAL,
        modalId: modalId,
        data: data
    };
}

export function closeModal(modalId) {
    return {
        type: types.CLOSE_MODAL,
        modalId: modalId
    };
}

function startEquitiesDispatch() {
    return { type: types.START_EQUITIES };
}

export function addCard(card, street, mode) {
    return {
        type: types.ADD_CARD,
        card: card,
        street: street,
        mode: mode
    };
}

export function validSelection(cards, street) {
    return ( dispatch, getState ) => {
        dispatch({
            type: types.VALID_CARDS_SELECTION,
            cards: cards,
            street: street
        });


        const cardsState = getState().cards;
        if (utils.areEquitiesCalculable(cardsState)) {
            dispatch(startEquitiesDispatch());
            callApi(cardsState, dispatch);
        }
    };
}

export function removeCard(card, street, mode) {
    return {
        type: types.REMOVE_CARD,
        card: card,
        street: street,
        mode: mode
    };
}

export function clearBoard() {
    return {
        type: types.CLEAR_BOARD
    };
}

export function clearCards(mode) {
    return {
        type: types.CLEAR_CARDS,
        mode: mode
    };
}

function formatCardsPlayers(cards) {
    const arrayCards = [];

    const loop = ['player1', 'player2', 'player3', 'player4'];
    _.each(loop, p => {
        if (cards[p] !== '') {
            if (utils.isRange(cards[p])) {
                arrayCards.push(utils.formatRangeForAPI(cards[p]));
            } else {
                arrayCards.push(cards[p]);
            }
        }
    });

    return arrayCards;
}

function truncate(equity) {
    const floatEquity = parseFloat(equity) * 100;
    return Math.round(floatEquity * 100) / 100;
}

function callApi(cards, dispatch) {
    let board = '';

    const cardsPlayers = formatCardsPlayers(cards);

    board += cards.flop;


    if (cards.turn) {
        board += cards.turn;
    }

    if (cards.river) {
        board += cards.river;
    }

    return request.post('http://deeprun.poker:8000/api')
        .send({ hands: cardsPlayers, board: board })
        .end(function(err, res) {
            dispatch(gotEquities(res.body, cards));
        });
}


function gotEquities(result, cards) {
    const equities = [null, null, null, null];

    const indexPlayers = [];
    const range = _.range(1, 5);

    _.map(range, i => {
        const index = 'player' + i;
        if (cards[index].length >= 1 && cards[index][0] !== '') {
            indexPlayers.push(i);
        }
    });

    _.map(result, (r, i) => {
        const iPlayer = indexPlayers[i];
        equities[iPlayer - 1] = truncate(r[1]);
    });

    return {
        type: types.GOT_EQUITIES,
        player1: equities[0],
        player2: equities[1],
        player3: equities[2],
        player4: equities[3]
    };
}
