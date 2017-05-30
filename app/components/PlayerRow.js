import React, { PropTypes } from 'react';
import UICard from './UICard';
import utils from '../utils/utils';
import { playerrow, equity } from '../styles/board.scss';
import RangeRow from './RangeRow';

const PlayerRow = ({ ...props }) => {
    const card1 = props.cards.slice(0, 2);
    const card2 = props.cards.slice(2, 4);

    return (
        <div className={ playerrow } onClick={props.onClick}>
            { (utils.isRange(props.cards)) ?
                <RangeRow cards={ props.cards } />
            :
                <div>
                    <UICard range={card1} />
                    <UICard range={card2} />
                </div>
            }

            {(props.equity) ?
                <div className={ equity }> {props.equity}%</div>
            :
                <div className={ equity }>%</div>
            }
        </div>
    );
};

PlayerRow.defaultProps = {
    cards: '',
    equity: null,
    onClick: function() {}
};

PlayerRow.propTypes = {
    cards: PropTypes.string,
    equity: PropTypes.number,
    onClick: PropTypes.func
};


export default PlayerRow;
