import React, { PropTypes } from 'react';
import Radium from 'radium';

const UIButton = ({ ...props }) => (
    <button
        onClick={props.onClick}
        style={[style.base, style[props.kind], props.style]}
    >
        {props.label}
    </button>
);

UIButton.defaultProps = {
    onClick: () => {},
    kind: 'normal',
    label: '',
    style: {}
};

UIButton.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    kind: PropTypes.string,
    style: PropTypes.object
};

const style = {
    base: {
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        height: '35px',
        borderBottom: '2px solid #928f8f',
        fontSize: '17px',
        fontWeight: '600',
        minWidth: '80px',
        transition: 'background 200ms ease',
        color: '#4d4d4d',
        ':hover': {
            background: '#b7b7b7'
        }
    },
    clear: {
        background: 'rgb(173, 173, 173)',
        color: 'white',
        ':hover': {
            background: '#928f8f'
        }
    },
    green: {
        background: '#64c353',
        borderBottom: '2px solid rgb(84, 167, 69)',
        color: 'white',
        ':hover': {
            background: '#50a241'
        }
    },
    normal: {
    }
};

export default Radium(UIButton);
