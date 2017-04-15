import utils from '../../app/utils/utils';

describe('Utils', () => {
    it('should return  disabled cards for the giving street', () => {
        let board = {
            player1: [{rank: '5', suit: 'spade'}, {rank: '4', suit: 'club'}],
            player2: [{rank: '5', suit: 'heart'}, {rank: '4', suit: 'diamond'}],
            flop: []
        };

        expect(utils.getDisabledCardsForStreet(board, 'player1')).toEqual(
            [{rank: '5', suit: 'heart'}, {rank: '4', suit: 'diamond'}]
        );

        expect(utils.getDisabledCardsForStreet(board, 'player2')).toEqual(
            [{rank: '5', suit: 'spade'}, {rank: '4', suit: 'club'}]
        );

        board = {
            player1: [{rank: '5', suit: 'spade'}, {rank: '4', suit: 'club'}],
            player2: [{rank: '5', suit: 'heart'}, {rank: '4', suit: 'diamond'}],
            flop: [{rank: 'K', suit: 'diamond'}, {rank: 'K', suit: 'heart'}, {rank: 'K', suit: 'club'}]
        };

        expect(utils.getDisabledCardsForStreet(board, 'flop')).toEqual(
            [{rank: '5', suit: 'spade'},
            {rank: '4', suit: 'club'},
            {rank: '5', suit: 'heart'},
            {rank: '4', suit: 'diamond'}]
        );

        expect(utils.getDisabledCardsForStreet(board, 'player1')).toEqual(
            [{rank: '5', suit: 'heart'},
            {rank: '4', suit: 'diamond'},
            {rank: 'K', suit: 'diamond'},
            {rank: 'K', suit: 'heart'},
            {rank: 'K', suit: 'club'}]
        );
    });


    it('should return return true if equities can be calculated', () => {
        let board = {
            player1: [],
            player2: [],
            flop: []
        };

        expect(utils.areEquitiesCalculable(board)).toBe(false);

        board = {
            player1: [{rank: '5', suit: 'spade'}],
            player2: [{rank: '5', suit: 'heart'}],
            flop: []
        };

        expect(utils.areEquitiesCalculable(board)).toBe(false);

        board = {
            player1: [{rank: '5', suit: 'spade'}, {rank: '4', suit: 'club'}],
            player2: [{rank: '5', suit: 'heart'}, {rank: '4', suit: 'diamond'}],
            flop: []
        };

        expect(utils.areEquitiesCalculable(board)).toBe(true);

        // board = {
        //     player1: [{rank: '5', suit: 'spade'}, {rank: '4', suit: 'club'}],
        //     player2: [{rank: '5', suit: 'heart'}, {rank: '4', suit: 'diamond'}],
        //     flop: [{rank: 'K', suit: 'diamond'}]
        // };
        //
        // expect(utils.areEquitiesCalculable(board)).toBe(false);

        board = {
            player1: [{rank: '5', suit: 'spade'}, {rank: '4', suit: 'club'}],
            player2: [{rank: '5', suit: 'heart'}, {rank: '4', suit: 'diamond'}],
            flop: [{rank: 'K', suit: 'diamond'}, {rank: 'K', suit: 'heart'}, {rank: 'K', suit: 'club'}]
        };

        expect(utils.areEquitiesCalculable(board)).toBe(true);
    });
});
