import _ from 'lodash';

const utils = {
    areEquitiesCalculable: (cards) => {
        const isPlayers = (cards.player1.length === 2 && cards.player2.length === 2);
        const isFlop = (cards.flop.length === 3);

        if (!_.isEmpty(cards.river)) {
            return (!_.isEmpty(cards.turn) && isFlop && isPlayers);
        }

        if (!_.isEmpty(cards.turn)) {
            return (isFlop && isPlayers);
        }
        if (cards.flop.length > 0) {
            return isPlayers && isFlop;
        }

        return isPlayers;
    },
    isClearable: (cards) => {
        return (
            cards.player1.length > 0 ||
            cards.player2.length > 0 ||
            cards.flop.length > 0 ||
            !_.isEmpty(cards.turn) ||
            !_.isEmpty(cards.river)
        );
    },
    getDisabledCardsForStreet: (cards, street) => {
        const streets = ['player1', 'player2', 'flop', 'turn', 'river'];
        const index = streets.indexOf(street);
        streets.splice(index, 1);

        let cardsDisabled = [];

        _.each(streets, (s) => {
            if (s === 'turn' || s === 'river') {
                if (cards[s]) {
                    cardsDisabled.push(cards[s]);
                }
            } else {
                cardsDisabled = [...cardsDisabled, ...cards[s]];
            }
        });


        return cardsDisabled;
    },
    capitalizeFirstLetter: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
};

export default utils;
