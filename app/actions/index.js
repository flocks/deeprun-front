import * as types from './types';
import utils from '../utils/utils';

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

        dispatch(callApi(cards));
    };
}

function callApi(cards) {
    console.log('cards: ', cards);
    return (dispatch) => {
        setTimeout(function() {
            dispatch(gotEquities({
                player1: 55,
                player2: 45
            }));
        }, 2000);
    };
}

function gotEquities(equities) {
    return {
        type: types.GOT_EQUITIES,
        player1: equities.player1,
        player2: equities.player2
    };
}
