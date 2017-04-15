import React, { PropTypes } from 'react';
import { addCard, removeCard, clearFlop, clearTurn, clearRiver, clearPlayer } from '../../actions';
import UICard from '../UICard';
import { connect } from 'react-redux';
import Radium, { StyleRoot } from 'radium';
import _ from 'lodash';
import UIButton from '../UIButton';
import utils from '../../utils/utils';
import { zoomIn } from 'react-animations';
import closeImage from '../../images/close.png';

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

let HandPicker = ({ ...props, onUnselect, onSelect, onClearFlop, onClearTurn, onClearRiver, onClearPlayer }) => {
    const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
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
        <StyleRoot style={style.base}>
            <div style={style.header}>
                <h3 style={style.street}>{utils.capitalizeFirstLetter(props.street)}</h3>
                <h4 style={style.sub_street}>Pick 2 cards</h4>
                <img style={style.close} src={closeImage} onClick={props.closeModal}/>
            </div>
            <div style={style.row}>
                {_.map(ranks, (rank) => {
                    let key = 'heart_' + rank;
                    let card = { rank: rank, suit: 'heart'};

                    return (
                        <UICard
                            card={card}
                            key={key}
                            selected={isSelected(card, selectedCards)}
                            disabled={isDisabled(card, disabledCards)}
                            onClick={HandleClick.bind(this, card)}
                            style={styleCard}
                        />
                    );
                })}

            </div>
            <div style={style.row}>
                {_.map(ranks, (rank) => {
                    let key = 'spade_' + rank;
                    let card = { rank: rank, suit: 'spade'};

                    return (
                        <UICard
                            card={card}
                            key={key}
                            disabled={isDisabled(card, disabledCards)}
                            selected={isSelected(card, selectedCards)}
                            onClick={HandleClick.bind(this, card)}
                            style={styleCard}
                        />
                    );
                })}
            </div>
            <div style={style.row}>
                {_.map(ranks, (rank) => {
                    let key = 'club_' + rank;
                    let card = { rank: rank, suit: 'club'};

                    return (
                        <UICard
                            card={card}
                            key={key}
                            selected={isSelected(card, selectedCards)}
                            disabled={isDisabled(card, disabledCards)}
                            onClick={HandleClick.bind(this, card)}
                            style={styleCard}
                        />
                    );
                })}
            </div>
            <div style={style.row}>
                {_.map(ranks, (rank) => {
                    let key = 'diamond_' + rank;
                    let card = { rank: rank, suit: 'diamond'};

                    return (
                        <UICard
                            card={card}
                            key={key}
                            selected={isSelected(card, selectedCards)}
                            onClick={HandleClick.bind(this, card)}
                            disabled={isDisabled(card, disabledCards)}
                            style={styleCard}
                        />
                    );
                })}
            </div>
            <div style={style.buttons}>
                <UIButton style={style.buttons.left} label="clear" onClick={clearStreet} kind="clear" />
                <UIButton style={style.buttons.right} label="Ok" onClick={props.closeModal} kind="green" />
            </div>
        </StyleRoot>
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

const style = {
    base: {
        background: 'white',
        borderRadius: '4px',
        boxShadow: '1px 2px 10px #b3b3b3',
        width: '600px',
        textAlign: 'center',
        padding: '139px 20px 23px',
        position: 'relative',
        margin: '80px auto',
        animation: 'x 100ms',
        animationName: Radium.keyframes(zoomIn, 'zoomIn'),
        '@media (max-width: 600px)': {
            width: '100%',
            padding: '139px 0',
            margin: '70px auto'
        }
    },
    header: {
        background: '#f3f5f3',
        position: 'absolute',
        padding: '20px 20px 0',
        top: '0',
        right: '0',
        left: '0',
    },
    close: {
        position: 'absolute',
        cursor: 'pointer',
        top: '50%',
        right: '36px',
        marginTop: '-16px',
        width: '32px'
    },
    street: {
        color: '#4d4d4d',
        textAlign: 'left',
        margin: '0 10px 5px',
        fontSize: '30px'
    },
    sub_street: {
        margin: '0 10px 15px',
        textAlign: 'left',
        color: '#adadad',
        fontWeight: '600',
        fontSize: '17px'
    },
    row: {
        display: 'inline-block',
        marginBottom: '5px',
        '@media (max-width: 568px)': {
            textAlign: 'left'
        }
    },
    buttons: {
        marginTop: '20px',
        position: 'relative',
        height: '50px',
        right: {
            position: 'absolute',
            right: '12px'
        },
        left: {
            position: 'absolute',
            left: '5px'
        }
    }
};


const styleCard = {
    base: {
        '@media (max-width: 600px)': {
            width: '22px',
            height: '33px',
            lineHeight: '30px',
            fontSize: '18px',
            fontWeight: '600',
            borderWidth: '3px',
            marginBottom: '5px'
        },
        '@media (max-width: 568px)': {
            width: '22px',
            height: '33px',
            lineHeight: '25px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '5px',
            marginRight: '1px'
        }
    }
};

HandPicker = Radium(HandPicker);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HandPicker);
