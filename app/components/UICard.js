import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from '../styles/card.scss';

const UICard2 = ({ ...props }) => {
    const handleClick = () => {
        if (!props.disabled) {
            props.onClick();
        }
    };

    const suit = props.range.charAt(1);

    let className = cx(styles.card, styles[suit], {
        [styles.selected]: props.selected,
        [styles.disabled]: props.disabled
    });

    return (
        <div
            className={ className }
            onClick={handleClick}
        >
            <div>{props.range.charAt(0)}</div>
        </div>
    );
};

UICard2.defaultProps = {
    range: '',
    onClick: function onClick() {},
    disabled: false,
    selected: false
};

UICard2.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    range: PropTypes.string,
    selected: PropTypes.bool,
    style: PropTypes.object
};


export default UICard2;
