/* eslint-disable no-undef */
import { filterTable } from '../app/actions';
import { openModal } from '../app/actions';
import { closeModal } from '../app/actions';
import { addCard } from '../app/actions';
import { clearBoard } from '../app/actions';
import { validSelection } from '../app/actions';
import { clearCards } from '../app/actions';
import { removeCard } from '../app/actions';
import * as types from '../app/actions/types';
// import jest from 'jest';

describe('Actions Creators', () => {
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
        const action = addCard('Ah', 'flop', 'single');

        expect(action).toEqual({
            type: types.ADD_CARD,
            card: 'Ah',
            street: 'flop',
            mode: 'single'
        });
    });

    it('remove card action', () => {
        const action = removeCard('Ah', 'flop', 'single');
        expect(action).toEqual({
            type: types.REMOVE_CARD,
            card: 'Ah',
            street: 'flop',
            mode: 'single'
        });
    });



    it('validSelection and call startequities if needed', () => {
        const state = {
            cards: {
                player1: '',
                player2: 'AdKs',
                player3: 'QsJs',
                player4: '',
                flop: '',
                turn: '',
                river: ''
            }
        };

        const getState = () => (state);
        const dispatch = jest.fn();
        validSelection('AhKd', 'player1')(dispatch, getState);

        expect(dispatch.mock.calls[0][0]).toEqual({
            type: types.VALID_CARDS_SELECTION,
            cards: 'AhKd',
            street: 'player1'
        });

        expect(dispatch.mock.calls[1][0]).toBeDefined();
        expect(dispatch.mock.calls[1][0]).toEqual({
            type: types.START_EQUITIES
        });
    });

    it('clear cards', () => {
        const action = clearCards('single');
        expect(action).toEqual({
            type: types.CLEAR_CARDS,
            mode: 'single'
        });
    });

    it('clear board', () => {
        const action = clearBoard();
        expect(action).toEqual({
            type: types.CLEAR_BOARD
        });
    });
});

