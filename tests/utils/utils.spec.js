import utils from '../../app/utils/utils';

describe('Utils', () => {
    it('should return  disabled cards for the giving street', () => {
        let board = {
            player1: '5s4c',
            player2: '5h4d',
            player3: '',
            player4: '',
            flop: '',
            turn: '',
            river: ''
        };

        expect(utils.getDisabledCardsForStreet(board, 'player1')).toEqual(
            ['5h', '4d']
        );

        expect(utils.getDisabledCardsForStreet(board, 'player2')).toEqual(
            ['5s', '4c']
        );

        board = {
            player1: '5s4c',
            player2: '5h4d',
            player3: '',
            player4: '',
            flop: 'KdKhKc',
            turn: '',
            river: ''
        };

        expect(utils.getDisabledCardsForStreet(board, 'flop')).toEqual(
            ['5s', '4c', '5h', '4d']
        );

        expect(utils.getDisabledCardsForStreet(board, 'player1')).toEqual(
            ['5h', '4d', 'Kd', 'Kh', 'Kc']
        );
    });


    it('should return return true if equities can be calculated', () => {
        let board = {
            player1: '5s4c',
            player2: '5h4d',
            player3: '',
            player4: '',
            flop: 'KdKhKc',
            turn: '',
            river: ''
        };

        expect(utils.areEquitiesCalculable(board)).toBe(true);

        board = {
            player1: '5s4c',
            player2: '5h4d',
            player3: '',
            player4: '',
            flop: 'KdKh',
            turn: '',
            river: ''
        };

        expect(utils.areEquitiesCalculable(board)).toBe(false);

        board = {
            player1: 'AA',
            player2: '5h4d',
            player3: '',
            player4: 'KK',
            flop: '',
            turn: '',
            river: ''
        };

        expect(utils.areEquitiesCalculable(board)).toBe(true);

        board = {
            player1: 'AA',
            player2: '5h4d',
            player3: '',
            player4: 'KK',
            flop: 'KdKhKs',
            turn: 'Ad',
            river: 'Ts'
        };

        expect(utils.areEquitiesCalculable(board)).toBe(true);
    });
});
