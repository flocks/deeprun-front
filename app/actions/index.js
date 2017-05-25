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


function addCardDispatch(card, street) {
    return {
        type: types.ADD_CARD,
        card: card,
        street: street
    };
}

function startEquitiesDispatch() {
    return { type: types.START_EQUITIES };
}

export function addCard(card, street) {
    return ( dispatch, getState ) => {
        dispatch(addCardDispatch(card, street));

        const cards = getState().cards;
        if (utils.areEquitiesCalculable(cards)) {
            dispatch(startEquitiesDispatch());
            callApi(cards, dispatch);
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
            dispatch(startEquitiesDispatch());
            callApi(cards, dispatch);
        }
    };
}

export function clearTurn() {
    return ( dispatch, getState ) => {
        dispatch({type: types.CLEAR_TURN });
        const cards = getState().cards;

        if (utils.areEquitiesCalculable(cards)) {
            dispatch(startEquitiesDispatch());
            callApi(cards, dispatch);
        }
    };
}

export function clearRiver() {
    return ( dispatch, getState ) => {
        dispatch({type: types.CLEAR_RIVER });
        const cards = getState().cards;

        if (utils.areEquitiesCalculable(cards)) {
            dispatch(startEquitiesDispatch());
            callApi(cards, dispatch);
        }
    };
}

function formatCard(card) {
    if (!_.isEmpty(card)) {
        return card.rank + card.suit.charAt(0);
    }

    return '';
}

function formatCardsPlayers(cards) {
    const arrayCards = [];

    if (cards.player1 && !_.isEmpty(cards.player1)) {
        arrayCards.push(formatCard(cards.player1[0]) + formatCard(cards.player1[1]));
    }

    if (cards.player2 && !_.isEmpty(cards.player2)) {
        arrayCards.push(formatCard(cards.player2[0]) + formatCard(cards.player2[1]));
    }

    if (cards.player3 && !_.isEmpty(cards.player3)) {
        arrayCards.push(formatCard(cards.player3[0]) + formatCard(cards.player3[1]));
    }

    if (cards.player4 && !_.isEmpty(cards.player4)) {
        arrayCards.push(formatCard(cards.player4[0]) + formatCard(cards.player4[1]));
    }

    return arrayCards;
}

function truncate(equity) {
    const floatEquity = parseFloat(equity) * 100;
    return Math.round(floatEquity * 100) / 100;
}

function callApi(cards, dispatch) {
    let board = '';

    const cardsPlayers = formatCardsPlayers(cards);

    _.map(cards.flop, (c) => {
        board += formatCard(c);
    });

    board += formatCard(cards.turn);
    board += formatCard(cards.river);

    return request.post('http://deeprun.poker:8000/api')
        .send({ hands: cardsPlayers, board: board })
        .end(function(err, res) {
            dispatch(gotEquities(res.body, cards));
        });
}


function gotEquities(result, cards) {
    const r1 = _.isUndefined(result[0]) ? null : truncate(result[0][1]);
    const r2 = _.isUndefined(result[1]) ? null : truncate(result[1][1]);
    const r3 = _.isUndefined(result[2]) ? null : truncate(result[2][1]);
    const r4 = _.isUndefined(result[3]) ? null : truncate(result[3][1]);

    console.log(result);
    console.log(cards);

    return {
        type: types.GOT_EQUITIES,
        player1: r1,
        player2: r2,
        player3: r3,
        player4: r4
    };
}
