import React, { PropTypes } from 'react';
import styles from '../styles/rangerow.scss';
import utils from '../utils/utils';

const RangeRow = ({ ...props }) => {
    utils.formatRange(props.cards);
    const truncate = (str) => {
        if (str.length > 35) {
            return str.substring(0, 35) + '...';
        }

        return str;
    };

    return (
        <div className={ styles.range }>{truncate(utils.formatRange(props.cards))}</div>
    );
};

RangeRow.defaultProps = {
    cards: ''
};

RangeRow.propTypes = {
    cards: PropTypes.string
};


export default RangeRow;
