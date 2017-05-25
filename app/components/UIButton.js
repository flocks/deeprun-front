import React, { PropTypes } from 'react';
import cx from 'classnames';
import buttons from '../styles/buttons.scss';

const UIButton = ({ ...props }) => {
    const arr = [props.className, buttons[props.kind]];
    const c = cx.apply(this, arr);

    return (
        <button
            onClick={props.onClick}
            className={c}
        >
            {props.label}
        </button>
    );
};

UIButton.defaultProps = {
    onClick: () => {},
    label: '',
    kinds: ''
};

UIButton.propTypes = {
    onClick: PropTypes.func,
    kind: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
};


export default UIButton;
