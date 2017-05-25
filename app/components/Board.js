import React, { PropTypes } from 'react';
import UICard from './UICard';
import { flop, turn, river } from '../styles/board.scss';

const Board = ({...props}) => {
    return (
        <div>
            <div className={ flop } onClick={props.onClick.bind(this, 'flop')}>
                <UICard card={props.cards.flop[0]} />
                <UICard card={props.cards.flop[1]} />
                <UICard card={props.cards.flop[2]} />
            </div>
            <div className={ turn } >
                <UICard
                    card={props.cards.turn}
                    onClick={props.onClick.bind(this, 'turn')}
                />
            </div>
            <div className={ river }>
                <UICard
                    card={props.cards.river}
                    onClick={props.onClick.bind(this, 'river')}
                />
            </div>
        </div>
    );
};

Board.defaultProps = {
    onClick: () => {},
    cards: {
        flop: [{}, {}, {}],
        turn: {},
        river: {}
    }
};
Board.propTypes = {
    onClick: PropTypes.func,
    cards: PropTypes.object
};

export default Board;
