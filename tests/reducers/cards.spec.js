import * as types from '../../app/actions/types';
import reducer from '../../app/reducers/cards';

describe('Reducers card', () => {
    const initialState = {
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        flop: '',
        turn: '',
        river: ''
    };

    it('should clear all the board and players cards', () => {
        const action = {
            type: types.CLEAR_BOARD
        };
        const expected = {
            player1: '',
            player2: '',
            player3: '',
            player4: '',
            flop: '',
            turn: '',
            river: ''
        };

        const received = reducer(initialState, action);


        expect(received).toEqual(expected);
    });

    it('should add cards in handpicker to proper street', () => {
        let action = {
            type: types.VALID_CARDS_SELECTION,
            cards: 'AhKd',
            street: 'player1'
        };

        let expected = {
            player1: 'AhKd',
            player2: '',
            player3: '',
            player4: '',
            flop: '',
            turn: '',
            river: ''
        };

        let received = reducer(initialState, action);

        expect(received).toEqual(expected);

        action = {
            type: types.VALID_CARDS_SELECTION,
            cards: 'AhQd',
            street: 'player2'
        };

        expected = {
            player1: 'AhKd',
            player2: 'AhQd',
            player3: '',
            player4: '',
            flop: '',
            turn: '',
            river: ''
        };

        received = reducer(received, action);

        expect(received).toEqual(expected);

        action = {
            type: types.VALID_CARDS_SELECTION,
            cards: '',
            street: 'player2'
        };

        expected = {
            player1: 'AhKd',
            player2: '',
            player3: '',
            player4: '',
            flop: '',
            turn: '',
            river: ''
        };

        received = reducer(received, action);

        expect(received).toEqual(expected);

        action = {
            type: types.VALID_CARDS_SELECTION,
            cards: 'KsTs9s',
            street: 'flop'
        };

        expected = {
            player1: 'AhKd',
            player2: '',
            player3: '',
            player4: '',
            flop: 'KsTs9s',
            turn: '',
            river: ''
        };

        received = reducer(received, action);

        expect(received).toEqual(expected);
    });

});
