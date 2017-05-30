import _ from 'lodash';

const utils = {
    generateRangeCards: () => {
        const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
        const cardsRange = [];
        _.each(ranks, (rank1, i) => {
            const line = [];
            _.each(ranks, (rank2, j) => {
                let s = '';
                if (j > i) {
                    s = 's';
                } else if (j !== i ) {
                    s = 'o';
                }

                const index1 = ranks.indexOf(rank1);
                const index2 = ranks.indexOf(rank2);

                let str = '';

                if (index2 > index1) {
                    str = rank1 + rank2 + s;
                } else {
                    str = rank2 + rank1 + s;
                }

                const object = {
                    value: str,
                    suited: (j > i),
                    pair: (i === j),
                    index1: index1,
                    index2: index2
                };

                line.push(object);
            });

            cardsRange.push(line);
        });

        return cardsRange;
    },
    formatRangeForAPI: (cards) => {
        const allRanges = utils.generateRangeCards();
        const selected = [];
        _.map(allRanges, line => {
            _.map(line, range => {
                if (cards.indexOf(range.value) > -1) {
                    selected.push(range.value);
                }
            });
        });

        return selected.join(',');
    },
    formatRange: (cards) => {
        // we need to group hand range by same type
        // eg all the pairs so 223344556677 become 22-66
        // QQKKAA must become QQ+
        // AQsAKs muste become AQs+
        // ..etc

        const allRanges = utils.generateRangeCards();
        const selected = [];
        _.map(allRanges, line => {
            _.map(line, range => {
                if (cards.indexOf(range.value) > -1) {
                    selected.push(range);
                }
            });
        });

        const pairs = _.sortBy(_.filter(selected, {pair: true}), ['index1', 'index2']);
        const suited = _.sortBy(_.filter(selected, {suited: true}), ['index1', 'index2']);
        const offsuit = _.sortBy(_.filter(selected, {suited: false, pair: false}), ['index2', 'index1']);

        const groupsOfPairs = [];
        let t = [];

        for (let i = 0; i < pairs.length; ++i) {
            if (i === 0) {
                t.push(pairs[i]);
                continue;
            }
            if (pairs[i - 1].index1 !== (pairs[i].index1 - 1)) {
                groupsOfPairs.push(t);
                t = [];
            }

            t.push(pairs[i]);
        }

        if (t.length > 0) {
            groupsOfPairs.push(t);
        }

        let stringPairs = '';
        _.each(groupsOfPairs.reverse(), (sub, i) => {
            if (i > 0) {
                stringPairs += ',';
            }
            if (sub.length > 1 && sub[0].value === 'AA') {
                stringPairs += sub[sub.length - 1].value + '+';
            } else if (sub.length > 1) {
                const sorted = sub;
                stringPairs += sorted[sub.length - 1].value + '-' + sorted[0].value;
            } else {
                stringPairs += sub[0].value;
            }
        });

        const strSuited = utils.handleNotPairHand(suited, false);
        const strOff = utils.handleNotPairHand(offsuit, true);

        return stringPairs + ' ' + strSuited + ' ' + strOff;
    },
    handleNotPairHand: (cards, off) => {
        const groups = [];
        let t = [];
        let str = '';

        if (off) {
            console.log(cards);
        }
        for (let i = 0; i < cards.length; ++i) {
            if (i === 0) {
                t.push(cards[i]);
                continue;
            }
            const isGrouped = (off) ? cards[i - 1].index2 !== (cards[i].index2) || cards[i - 1].index1 !== (cards[i].index1 - 1) : cards[i - 1].index1 !== (cards[i].index1) || cards[i - 1].index2 !== (cards[i].index2 - 1);

            if (isGrouped) {
                groups.push(t);
                t = [];
            }

            t.push(cards[i]);
        }

        if (t.length > 0) {
            groups.push(t);
        }

        // console.log(off);
        // console.log(groups);

        _.each(groups.reverse(), (sub, i) => {
            if (i > 0) {
                str += ',';
            }

            const isPlus = (off) ? sub[0].index1 === (sub[0].index2 + 1) : sub[0].index1 === (sub[0].index2 - 1);

            if (sub.length > 1 && isPlus) {
                str += sub[sub.length - 1].value + '+';
            } else if (sub.length > 1) {
                str += sub[sub.length - 1].value + '-' + sub[0].value;
            } else {
                str += sub[0].value;
            }
        });

        return str;
    },
    isRange: (cards) => {
        // cards is an string like "AhKd" or "AAKK" or "22"
        if (cards === '') {
            return false;
        }

        if (cards.length <= 2) {
            return true;
        }

        if (!_.includes(['h', 's', 'd', 'c'], cards[1]) && !_.includes(['h', 's', 'd', 'c'], cards[3])) {
            return true;
        }

        return false;
    },
    areEquitiesCalculable: (cards) => {
        // dont remember a card is 2 characters ( rank suit)
        // at least 2 players, and if flop we need 3 cards, if turn we need flop, and if river we need turn..etc.
        if (cards.flop.length > 1 && cards.flop.length < 6) {
            return false;
        }

        const listPlayers = ['player1', 'player2', 'player3', 'player4'];
        let count = 0;
        _.each(listPlayers, p => {
            if (utils.isRange(cards[p]) || cards[p].length >= 4) {
                count++;
            }
        });

        const isPlayers = (count >= 2);
        const isFlop = cards.flop.length === 6;
        const isTurn = cards.turn.length === 2;
        const isRiver = cards.river.length === 2;

        if (isRiver) {
            return (isTurn && isFlop && isPlayers);
        }

        if (isTurn) {
            return (isFlop && isPlayers);
        }

        if (isFlop) {
            return isPlayers;
        }


        return (isPlayers);
    },
    isClearable: (cards) => {
        return (
            cards.player1.length > 0 ||
            cards.player2.length > 0 ||
            cards.player3.length > 0 ||
            cards.player4.length > 0 ||
            cards.flop.length > 0 ||
            cards.turn.length > 0 ||
            cards.river.length > 0
        );
    },
    getDisabledCardsForStreet: (cards, street) => {
        const streets = ['player1', 'player2', 'player3', 'player4', 'flop', 'turn', 'river'];
        const index = streets.indexOf(street);
        streets.splice(index, 1);

        let cardsDisabled = [];

        _.each(streets, (s) => {
            if (s === 'turn' || s === 'river') {
                if (cards[s]) {
                    cardsDisabled.push(cards[s]);
                }
            } else {
                if (cards[s] !== '') {
                    let cardsStreet = [];
                    const str = cards[s];
                    cardsStreet = str.match(/.{1,2}/g);
                    cardsDisabled = [...cardsDisabled, ...cardsStreet];
                }
            }
        });


        return cardsDisabled;
    },
    capitalizeFirstLetter: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    convertHandToString: (card) => {
        return card.rank + card.suit.chatAt(0);
    }
};

export default utils;
