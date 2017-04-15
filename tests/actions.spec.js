/* eslint-disable no-undef */
import { filterTable } from '../app/actions';
import { openModal } from '../app/actions';
import { closeModal } from '../app/actions';
import { addCard } from '../app/actions';
import { clearBoard } from '../app/actions';
import { clearFlop } from '../app/actions';
import { clearPlayer } from '../app/actions';
import { clearTurn } from '../app/actions';
import { clearRiver } from '../app/actions';
import { removeCard } from '../app/actions';
import * as types from '../app/actions/types';
// import jest from 'jest';

describe('Actions Creators', () => {
    it('filter action', () => {
        const action = filterTable('test');
        expect(action).toEqual({
            type: types.FILTER,
            filter: 'test'
        });
    });

    it('open modal action', () => {
        const action = openModal('modalId', {data: 'test'});
        expect(action).toEqual({
            type: types.OPEN_MODAL,
            modalId: 'modalId',
            data: {
                'data': 'test'
            }
        });
    });

    it('close modal action', () => {
        const action = closeModal('modalId');
        expect(action).toEqual({
            type: types.CLOSE_MODAL,
            modalId: 'modalId'
        });
    });

    it('add card action', () => {
        const state = {
            cards: {
                player1: [],
                player2: [],
                flop: [],
                turn: {},
                river: {}
            }
        };
        const getState = () => (state);
        const dispatch = jest.fn();
        addCard({rank: '8', suit: 'spade'}, 'flop')(dispatch, getState);

        expect(dispatch.mock.calls[0][0]).toEqual({
            type: types.ADD_CARD,
            card: {rank: '8', suit: 'spade'},
            street: 'flop'
        });
    });

    it('remove card action', () => {
        const action = removeCard({rank: '8', suit: 'spade'}, 'flop');
        expect(action).toEqual({
            type: types.REMOVE_CARD,
            card: {rank: '8', suit: 'spade'},
            street: 'flop'
        });
    });

    it('clear player', () => {
        const action = clearPlayer('player1');
        expect(action).toEqual({
            type: types.CLEAR_PLAYER,
            player: 'player1'
        });
    });

    it('clear flop', () => {
        const state = {
            cards: {
                player1: [],
                player2: [],
                flop: [],
                turn: {},
                river: {}
            }
        };
        const getState = () => (state);
        const dispatch = jest.fn();
        clearFlop()(dispatch, getState);

        expect(dispatch.mock.calls[0][0]).toEqual({
            type: types.CLEAR_FLOP
        });
    });

    it('clear turn', () => {
        const state = {
            cards: {
                player1: [],
                player2: [],
                flop: [],
                turn: {},
                river: {}
            }
        };

        const getState = () => (state);
        const dispatch = jest.fn();
        clearTurn()(dispatch, getState);
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: types.CLEAR_TURN
        });
    });

    it('clear turn should dispatch equities if needed', () => {
        const state = {
            cards: {
                player1: [{}, {}],
                player2: [{}, {}],
                flop: [],
                turn: {},
                river: {}
            }
        };

        const getState = () => (state);
        const dispatch = jest.fn();
        const dispatch2 = jest.fn();
        clearTurn()(dispatch, getState);

        expect(dispatch.mock.calls[0][0]).toEqual({
            type: types.CLEAR_TURN
        });

        expect(dispatch.mock.calls[1][0]).toBeDefined();
        const test = dispatch.mock.calls[1][0];
        test(dispatch2);

        expect(dispatch2.mock.calls[0][0]).toEqual({
            type: types.START_EQUITIES
        });
    });

    it('clear river', () => {
        const state = {
            cards: {
                player1: [{}, {}],
                player2: [{}, {}],
                flop: [],
                turn: {},
                river: {}
            }
        };

        const getState = () => (state);
        const dispatch = jest.fn();

        clearRiver()(dispatch, getState);
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: types.CLEAR_RIVER
        });
    });

    it('clear board', () => {
        const action = clearBoard();
        expect(action).toEqual({
            type: types.CLEAR_BOARD
        });
    });
});

