import React, { PropTypes } from 'react';
// import { addCard, removeCard, clearFlop, clearTurn, clearRiver, clearPlayer } from '../../actions';
import UICard from '../UICard';
import _ from 'lodash';
import utils from '../../utils/utils';
// import closeImage from '../../images/close.png';
// import styles from '../../styles/handpicker.scss';


const isDisabled = (_card, _cardsDisabled) => {
    let disabled = false;
    _.each(_cardsDisabled, (card) => {
        if (card === _card) {
            disabled = true;
        }
    });

    return disabled;
};

const isSelected = (_card, _cardsSelected) => {
    let selected = false;

    _.each(_cardsSelected, (card) => {
        if (card === _card) {
            selected = true;
        }
    });

    return selected;
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

const HandPickerSingle = ({ ...props }) => {
    const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    const suits = ['h', 's', 'c', 'd'];
    const disabledCards = utils.getDisabledCardsForStreet(props.cards, props.street);
    const selectedCards = (props.selectedCards.match(/.{1,2}/g) !== null) ? props.selectedCards.match(/.{1,2}/g) : [];

    const HandleClick = (card) => {
        if (isSelected(card, selectedCards)) {
            props.unselect(card,  props.street, 'single');
        } else if (isSelectable(selectedCards, props.street)) {
            props.select(card, props.street, 'single');
        }
    };

    return (
        <div>
            { _.map(suits, suit => {
                return _.map(ranks, rank => {
                    const key = suit + '_' + rank;
                    const hand =  rank + suit;

                    return (
                        <UICard
                            range={ hand }
                            key={key}
                            selected={isSelected(hand, selectedCards)}
                            disabled={isDisabled(hand, disabledCards)}
                            onClick={HandleClick.bind(this, hand)}
                        />
                    );
                });
            })}
        </div>
    );
};

HandPickerSingle.propTypes = {
    cards: PropTypes.object,
    selectedCards: PropTypes.string,
    street: PropTypes.string,
    select: PropTypes.func,
    unselect: PropTypes.func
};

export default HandPickerSingle;

