import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from '../styles/cardRange.scss';

const UICardRange = ({ ...props }) => {
    const handleClick = () => {
        props.onClick(props.range, props.selected);
    };


    let className = cx(styles.cardRange, {
        [styles.suited]: props.suited,
        [styles.pair]: props.pair,
        [styles.selected]: props.selected
    });


    return (
        <div onClick={ handleClick } className={ className }>{props.range}</div>
    );
};

UICardRange.defaultProps = {
    range: '',
    onClick: function onClick() {},
    selected: false,
    pair: false,
    suited: false
};

UICardRange.propTypes = {
    onClick: PropTypes.func,
    range: PropTypes.string,
    selected: PropTypes.bool,
    pair: PropTypes.bool,
    suited: PropTypes.bool
};


export default UICardRange;
