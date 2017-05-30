import React, { PropTypes } from 'react';
import UICard from './UICard';
import { flop, turn, river } from '../styles/board.scss';

const Board = ({...props}) => {
    const flop1 = props.cards.flop.slice(0, 2);
    const flop2 = props.cards.flop.slice(2, 4);
    const flop3 = props.cards.flop.slice(4, 6);

    return (
        <div>
            <div className={ flop } onClick={props.onClick.bind(this, 'flop')}>
                <UICard range={flop1 || ''} />
                <UICard range={flop2 || ''} />
                <UICard range={flop3 || ''} />
            </div>
            <div className={ turn } >
                <UICard
                    range={props.cards.turn}
                    onClick={props.onClick.bind(this, 'turn')}
                />
            </div>
            <div className={ river }>
                <UICard
                    range={props.cards.river}
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
