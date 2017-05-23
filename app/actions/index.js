import * as types from './types';
import utils from '../utils/utils';
import request from 'superagent';
import _ from 'lodash';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
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

export function addCard(card, street) {
    return ( dispatch, getState) => {
        dispatch({
            type: types.ADD_CARD,
            card: card,
            street: street
        });

        const cards = getState().cards;

        if (utils.areEquitiesCalculable(cards)) {
            dispatch(startEquities(cards));
        }
    };
}

export function removeCard(card, street) {
    return {
        type: types.REMOVE_CARD,
        card: card,
        street: street
    };
}

export function clearBoard() {
    return {
        type: types.CLEAR_BOARD
    };
}

export function clearPlayer(player) {
    return {
        type: types.CLEAR_PLAYER,
        player: player
    };
}

export function clearFlop() {
    return ( dispatch, getState ) => {
        dispatch({type: types.CLEAR_FLOP });
        const cards = getState().cards;

        if (utils.areEquitiesCalculable(cards)) {
            dispatch(startEquities(cards));
        }
    };
}

export function clearTurn() {
    return ( dispatch, getState ) => {
        dispatch({type: types.CLEAR_TURN });
        const cards = getState().cards;

        if (utils.areEquitiesCalculable(cards)) {
            dispatch(startEquities(cards));
        }
    };
}

export function clearRiver() {
    return ( dispatch, getState ) => {
        dispatch({type: types.CLEAR_RIVER });
        const cards = getState().cards;

        if (utils.areEquitiesCalculable(cards)) {
            dispatch(startEquities(cards));
        }
    };
}

export function startEquities(cards) {
    return (dispatch) => {
        dispatch({
            type: types.START_EQUITIES
        });

        // dispatch(callApi(cards));
        setTimeout(function() {
            return callApi(cards, dispatch);
        }, 500);
    };
}

function formatCard(card) {
    if (!_.isEmpty(card)) {
        return card.rank + card.suit.charAt(0);
    }

    return '';
}

function truncate(equity) {
    const floatEquity = parseFloat(equity) * 100;
    return Math.round(floatEquity * 100) / 100;
}

function callApi(cards, dispatch) {
    const cardsPlayers = [];
    let board = '';

    cardsPlayers.push(formatCard(cards.player1[0]) + formatCard(cards.player1[1]));
    cardsPlayers.push(formatCard(cards.player2[0]) + formatCard(cards.player2[1]));

    _.map(cards.flop, (c) => {
        board += formatCard(c);
    });

    board += formatCard(cards.turn);
    board += formatCard(cards.river);

    return request.post('http://localhost:8000/api')
        .send({ hands: cardsPlayers, board: board })
        .end(function(err, res) {
            dispatch(gotEquities({
                player1: truncate(res.body[0][1]),
                player2: truncate(res.body[1][1])
            }));
        });
}

function gotEquities(equities) {
    return {
        type: types.GOT_EQUITIES,
        player1: equities.player1,
        player2: equities.player2
    };
}
