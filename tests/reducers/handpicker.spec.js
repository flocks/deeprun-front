import * as types from '../../app/actions/types';
import reducer from '../../app/reducers/handpicker';

describe('Reducers handpicker', () => {
    const initialState = {
        mode: 'single',
        single: '',
        range: ''
    };

    it('should change handpicker mode', () => {
        const action = {
            type: types.CHANGE_HANDPICKER_MODE,
            mode: 'range'
        };

        const expected = {
            mode: 'range',
            single: '',
            range: ''
        };

        const received = reducer(initialState, action);

        expect(received).toEqual(expected);
    });

    it('closing the modal should reset the handpicker', () => {
        const action = {
            type: types.CLOSE_MODAL
        };

        const expected = {
            mode: 'single',
            single: '',
            range: ''
        };

        const received = reducer(initialState, action);

        expect(received).toEqual(expected);
    });

    it('addCard should add the card to the proper mode', () => {
        const action = {
            type: types.ADD_CARD,
            mode: 'single',
            card: 'Ah'
        };

        const expected = {
            mode: 'single',
            single: 'Ah',
            range: ''
        };

        const received = reducer(initialState, action);

        expect(received).toEqual(expected);
    });

    it('addCard should add the card to the proper mode', () => {
        const action = {
            type: types.ADD_CARD,
            mode: 'range',
            card: 'Ah'
        };

        const expected = {
            mode: 'single',
            single: '',
            range: 'Ah'
        };

        const received = reducer(initialState, action);

        expect(received).toEqual(expected);
    });

    it('removeCard should remove the card from the proper mode', () => {
        const action = {
            type: types.REMOVE_CARD,
            mode: 'range',
            card: 'Ah'
        };

        const expected = {
            mode: 'range',
            single: '',
            range: 'KdQd'
        };

        const received = reducer({mode: 'range', single: '', range: 'AhKdQd'}, action);

        expect(received).toEqual(expected);
    });

    it('clear cards should remove all cards from proper mode', () => {
        const action = {
            type: types.CLEAR_CARDS,
            mode: 'range'
        };

        const expected = {
            mode: 'range',
            single: '',
            range: ''
        };

        const received = reducer({mode: 'range', single: '', range: 'AhKdQd'}, action);

        expect(received).toEqual(expected);
    });

    it('clear board reset the reducer', () => {
        const action = {
            type: types.CLEAR_BOARD
        };

        const expected = {
            mode: 'single',
            single: '',
            range: ''
        };

        const received = reducer({mode: 'range', single: '', range: 'AhKdQd'}, action);

        expect(received).toEqual(expected);
    });

    it('open the modal should taking into account the type of cards ( range or single )', () => {

        const action = {
            type: types.OPEN_MODAL,
            data: {
                cards: {
                    player1: 'AA,KK',
                    player2: '',
                    player3: '',
                    player4: '',
                    flop: '',
                    turn: '',
                    river: ''
                },
                street: 'player1'
            }
        };

        const expected = {
            mode: 'range',
            single: '',
            range: 'AA,KK'
        };

        const received = reducer(initialState, action);

        expect(received).toEqual(expected);

        const actionSingle = {
            type: types.OPEN_MODAL,
            data: {
                cards: {
                    player1: 'AhKd',
                    player2: '',
                    player3: '',
                    player4: '',
                    flop: '',
                    turn: '',
                    river: ''
                },
                street: 'player1'
            }
        };

        const expectedSingle = {
            mode: 'single',
            single: 'AhKd',
            range: ''
        };

        const receivedSingle = reducer(initialState, actionSingle);

        expect(receivedSingle).toEqual(expectedSingle);
    });
});
