import React, { PropTypes } from 'react';
import Radium from 'radium';
import { zoomIn } from 'react-animations';

const Spinner = ({ ...props }) => {
    if (props.isLoading) {
        return (
            <div style={props.style}>
                <div style={[style.base, style.dot1]}></div>
                <div style={[style.base, style.dot2]}></div>
                <div style={[style.base, style.dot3]}></div>
            </div>);
    }

    return false;
};

Spinner.defaultProps = {
    isLoading: false,
    style: {}
};

Spinner.propTypes = {
    isLoading: PropTypes.bool,
    style: PropTypes.object
};


const style = {
    base: {
        animation: 'x 1s infinite',
        animationName: Radium.keyframes(zoomIn, 'zoomIn'),
        background: 'grey',
        display: 'inline-block',
        borderRadius: '50%',
        height: '7px',
        width: '7px',
        marginRight: '5px'
    },
    dot1: {
        animationDelay: '100ms'
    },
    dot2: {
        animationDelay: '200ms'
    },
    dot3: {
        animationDelay: '300ms'
    }
};

export default Radium(Spinner);
