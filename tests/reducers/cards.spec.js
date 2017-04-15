import * as types from '../../app/actions/types';
import reducer from '../../app/reducers/cards';


describe('Reducers card', () => {
    it('should add card to proper street', () => {
        const actionPlayer1 = {
            type: types.ADD_CARD,
            street: 'player1',
            card: {rank: '5', suit: 'spade'}
        };
        const expectedPlayer1 = {
            player1: [{rank: '5', suit: 'spade'}]
        };
        const initialState = {};
        const receivedPlayer1 = reducer(initialState, actionPlayer1);

        const actionFlop = {
            type: types.ADD_CARD,
            street: 'flop',
            card: {rank: '3', suit: 'heart'}
        };

        const expectedFlop = {
            player1: [{rank: '5', suit: 'spade'}],
            flop: [{rank: '3', suit: 'heart'}]
        };

        const receivedFlop = reducer(receivedPlayer1, actionFlop);

        expect(receivedPlayer1).toEqual(expectedPlayer1);
        expect(receivedFlop).toEqual(expectedFlop);
    });

    it('should not add card to flop if there are already 3 cards', () => {
        const actionFlop = {
            type: types.ADD_CARD,
            street: 'flop',
            card: {rank: '5', suit: 'spade'}
        };

        const expectedFlop = {
            flop: [{}, {}, {}]
        };
        const initialState = {flop: [{}, {}, {}]};
        const receivedFlop = reducer(initialState, actionFlop);

        expect(receivedFlop).toEqual(expectedFlop);
    });


    it('should not add card to player if there are already 2 cards', () => {
        const actionPlayer = {
            type: types.ADD_CARD,
            street: 'player1',
            card: {rank: '5', suit: 'spade'}
        };

        const expectedPlayer = {
            player1: [{}, {}]
        };

        const initialState = {player1: [{}, {}]};
        const receivedPlayer = reducer(initialState, actionPlayer);

        expect(receivedPlayer).toEqual(expectedPlayer);
    });

    it('should set a turn', () => {
        const actionTurn = {
            type: types.ADD_CARD,
            street: 'turn',
            card: { rank: '5', suit: 'diamond'}
        };
        const expectedTurn = {
            turn: {rank: '5', suit: 'diamond'}
        };

        const receivedTurn = reducer({}, actionTurn);
        expect(receivedTurn).toEqual(expectedTurn);
    });

    it('should replace a turn', () => {
        const actionTurn = {
            type: types.ADD_CARD,
            street: 'turn',
            card: { rank: '5', suit: 'diamond'}
        };
        const expectedTurn = {
            turn: {rank: '5', suit: 'diamond'}
        };

        const initial = {turn: {rank: 'K', suit: 'spade'}};

        const receivedTurn = reducer(initial, actionTurn);
        expect(receivedTurn).toEqual(expectedTurn);
    });

    it('should set a river', () => {
        const actionriver = {
            type: types.ADD_CARD,
            street: 'river',
            card: { rank: '5', suit: 'diamond'}
        };
        const expectedriver = {
            river: {rank: '5', suit: 'diamond'}
        };

        const receivedriver = reducer({}, actionriver);
        expect(receivedriver).toEqual(expectedriver);
    });

    it('should replace a river', () => {
        const actionriver = {
            type: types.ADD_CARD,
            street: 'river',
            card: { rank: '5', suit: 'diamond'}
        };
        const expectedriver = {
            river: {rank: '5', suit: 'diamond'}
        };

        const initial = {river: {rank: 'K', suit: 'spade'}};

        const receivedriver = reducer(initial, actionriver);
        expect(receivedriver).toEqual(expectedriver);
    });

    it('should set a river', () => {
        expect(true).toEqual(true);
    });

    it('should add card to exinsting array', () => {
        const initialState = {
            player1: [{rank: '5', suit: 'spade'}],
            flop: [{rank: '3', suit: 'heart'}]
        };

        const action = {
            type: types.ADD_CARD,
            street: 'flop',
            card: {rank: '4', suit: 'spade'}
        };

        const expected = {
            player1: [{rank: '5', suit: 'spade'}],
            flop: [{rank: '3', suit: 'heart'}, {rank: '4', suit: 'spade'}]
        };

        const received = reducer(initialState, action);

        expect(received).toEqual(expected);
    });

    it('should remove card from correct street', () => {
        const initialState = {
            player1: [{rank: '5', suit: 'spade'}],
            flop: [{rank: '3', suit: 'heart'}]
        };

        const action = {
            type: types.REMOVE_CARD,
            street: 'flop',
            card: {rank: '3', suit: 'heart'}
        };

        const expected = {
            player1: [{rank: '5', suit: 'spade'}],
            flop: []
        };

        const received = reducer(initialState, action);

        expect(received).toEqual(expected);
    });

    it('should clear player', () => {
        const initialState = {
            player1: [{rank: '5', suit: 'spade'}],
            player2: [{rank: '4', suit: 'spade'}],
            flop: [{rank: '3', suit: 'heart'}]
        };

        const expected = {
            player1: [],
            player2: [{rank: '4', suit: 'spade'}],
            flop: [{rank: '3', suit: 'heart'}]
        };

        const action = {
            type: types.CLEAR_PLAYER,
            player: 'player1'
        };

        const received = reducer(initialState, action);
        expect(received).toEqual(expected);
    });

    it('should clear flop', () => {
        const initialState = {
            player1: [{rank: '5', suit: 'spade'}],
            player2: [{rank: '4', suit: 'spade'}],
            flop: [{rank: '3', suit: 'heart'}]
        };

        const expected = {
            player1: [{rank: '5', suit: 'spade'}],
            player2: [{rank: '4', suit: 'spade'}],
            flop: [],
        };

        const action = {
            type: types.CLEAR_FLOP
        };

        const received = reducer(initialState, action);

        expect(received).toEqual(expected);
    });

    it('should clear turn', () => {
        const initialState = {
            player1: [{rank: '5', suit: 'spade'}],
            player2: [{rank: '4', suit: 'spade'}],
            flop: [{rank: '3', suit: 'heart'}],
            turn: {rank: '3', suit: 'heart'}
        };

        const expected = {
            player1: [{rank: '5', suit: 'spade'}],
            player2: [{rank: '4', suit: 'spade'}],
            flop: [{rank: '3', suit: 'heart'}],
            turn: {},
        };

        const action = {
            type: types.CLEAR_TURN
        };

        const received = reducer(initialState, action);

        expect(received).toEqual(expected);
    });

    it('should clear river', () => {
        const initialState = {
            player1: [{rank: '5', suit: 'spade'}],
            player2: [{rank: '4', suit: 'spade'}],
            flop: [{rank: '3', suit: 'heart'}],
            turn: {rank: '3', suit: 'heart'},
            river: {rank: '3', suit: 'heart'}
        };

        const expected = {
            player1: [{rank: '5', suit: 'spade'}],
            player2: [{rank: '4', suit: 'spade'}],
            flop: [{rank: '3', suit: 'heart'}],
            turn: {rank: '3', suit: 'heart'},
            river: {},
        };

        const action = {
            type: types.CLEAR_RIVER
        };

        const received = reducer(initialState, action);

        expect(received).toEqual(expected);
    });

    it('should clear board', () => {
        const initialState = {
            player1: [{rank: '5', suit: 'spade'}],
            flop: [{rank: '3', suit: 'heart'}]
        };

        const expected = {
            player1: [],
            player2: [],
            flop: [],
            turn: {},
            river: {}
        };

        const action = {
            type: types.CLEAR_BOARD
        };

        const received = reducer(initialState, action);

        expect(received).toEqual(expected);
    });
});
