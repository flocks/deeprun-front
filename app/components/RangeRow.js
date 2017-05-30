import React, { PropTypes } from 'react';
import styles from '../styles/rangerow.scss';
import utils from '../utils/utils';

const RangeRow = ({ ...props }) => {
    utils.formatRange(props.cards);
    return (
        <div className={ styles.range }>{utils.formatRange(props.cards)}</div>
    );
};

RangeRow.defaultProps = {
    cards: ''
};

RangeRow.propTypes = {
    cards: PropTypes.string
};


export default RangeRow;
