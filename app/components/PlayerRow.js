import React, { PropTypes } from 'react';
import UICard from './UICard';
import { playerrow, equity } from '../styles/board.scss';

const PlayerRow = ({ ...props }) => {
    return (
        <div className={ playerrow } onClick={props.onClick}>
            <div>
                <UICard card={props.cards[0]} />
                <UICard card={props.cards[1]} />
            </div>

            {(props.equity) ?
                <div className={ equity }> {props.equity}%</div>
            :
                <div className={ equity }>%</div>
            }
        </div>
    );
};

PlayerRow.defaultProps = {
    cards: [{}, {}],
    equity: null,
    onClick: function() {}
};

PlayerRow.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    equity: PropTypes.number,
    onClick: PropTypes.func
};


export default PlayerRow;
