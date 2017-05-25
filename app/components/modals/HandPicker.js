import React, { PropTypes } from 'react';
import { addCard, removeCard, clearFlop, clearTurn, clearRiver, clearPlayer } from '../../actions';
import UICard from '../UICard';
import { connect } from 'react-redux';
import _ from 'lodash';
import UIButton from '../UIButton';
import utils from '../../utils/utils';
// import closeImage from '../../images/close.png';
import styles from '../../styles/handpicker.scss';
import modalBinding from '../decorators/modalBinding';


const isDisabled = (_card, _cardsDisabled) => {
    let disabled = false;
    _.each(_cardsDisabled, (card) => {
        if (card.rank === _card.rank && _card.suit === card.suit) {
            disabled = true;
        }
    });

    return disabled;
};

const isSelected = (_card, _cardsSelected) => {
    let selected = false;

    _.each(_cardsSelected, (card) => {
        if (card.rank === _card.rank && _card.suit === card.suit) {
            selected = true;
        }
    });

    return selected;
};

const extractSelectedCards = (cards, street) => {
    let selectedCards = [];
    switch(street) {
        case 'turn':
        case 'river':
            if (cards[street]) {
                selectedCards.push(cards[street]);
            }
            break;
        default:
            selectedCards = [...selectedCards, ...cards[street]];
            break;
    }

    return selectedCards;
};

const isSelectable = (cardsSelected, street) => {
    let selectable = true;

    switch(street) {
        case 'player1':
        case 'player2':
        case 'player3':
        case 'player4':
            selectable = (cardsSelected.length < 2);
            break;
        case 'flop':
            selectable = (cardsSelected.length < 3);
            break;
        default:
            selectable = true;
            break;
    }

    return selectable;
};

const HandPicker = ({ ...props, onUnselect, onSelect, onClearFlop, onClearTurn, onClearRiver, onClearPlayer }) => {
    const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    const suits = ['heart', 'spade', 'club', 'diamond'];
    const disabledCards = utils.getDisabledCardsForStreet(props.cards, props.street);

    const selectedCards = extractSelectedCards(props.cards, props.street);

    const HandleClick = (card) => {
        if (isSelected(card, selectedCards)) {
            onUnselect(card,  props.street);
        } else if (isSelectable(selectedCards, props.street)) {
            onSelect(card, props.street);
        }
    };

    const clearStreet = () => {
        if (props.street === 'flop') {
            onClearFlop();
        } else if (props.street === 'turn') {
            onClearTurn();
        } else if (props.street === 'river') {
            onClearRiver();
        } else {
            onClearPlayer(props.street);
        }
    };


    return (
        <div className={ styles.handpicker }>
            <div>
                <h3>{utils.capitalizeFirstLetter(props.street)}</h3>
            </div>
            <div>
                { _.map(suits, suit => {
                    return _.map(ranks, rank => {
                        const key = suit + '_' + rank;
                        const card = { rank: rank, suit: suit};

                        return (
                            <UICard
                                card={card}
                                key={key}
                                selected={isSelected(card, selectedCards)}
                                disabled={isDisabled(card, disabledCards)}
                                onClick={HandleClick.bind(this, card)}
                            />
                        );
                    });
                })}

            </div>
            <div className={ styles.footer }>
                <UIButton kind="clear" label="clear" onClick={clearStreet} kind="clear" />
                <UIButton className={ styles.valid } kind="valid" label="Ok" onClick={props.closeModal} />
            </div>
        </div>
    );
};

HandPicker.propTypes = {
    closeModal: PropTypes.func,
    cards: React.PropTypes.object,
    street: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    onClearPlayer: React.PropTypes.func,
    onClearFlop: React.PropTypes.func,
    onClearTurn: React.PropTypes.func,
    onClearRiver: React.PropTypes.func,
    onUnselect: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        cards: state.cards
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (card, street) => dispatch(addCard(card, street)),
        onClearPlayer: (player) => dispatch(clearPlayer(player)),
        onClearFlop: () => dispatch(clearFlop()),
        onClearTurn: () => dispatch(clearTurn()),
        onClearRiver: () => dispatch(clearRiver()),
        onUnselect: (card, street) => dispatch(removeCard(card, street))
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(modalBinding(HandPicker));
