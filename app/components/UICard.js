import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from '../styles/card.scss';

const UICard = ({ ...props }) => {
    const handleClick = () => {
        if (!props.disabled) {
            props.onClick();
        }
    };

    let className = cx(styles.card, styles[props.card.suit], {
        [styles.selected]: props.selected,
        [styles.disabled]: props.disabled
    });

    return (
        <div
            className={ className }
            onClick={handleClick}
        >
            <div>{props.card.rank}</div>
        </div>
    );
};

UICard.defaultProps = {
    card: {
        rank: null,
        suit: null
    },
    onClick: function onClick() {},
    disabled: false,
    selected: false
};

UICard.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    card: PropTypes.object,
    selected: PropTypes.bool,
    style: PropTypes.object
};


export default UICard;
