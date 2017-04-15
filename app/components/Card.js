import React, { PropTypes } from 'react';
import Radium from 'radium';
import colors from '../styles/colors';


const Card = ({ ...props }) => {
    return (
        <div
            style={[
                style.base, style[props.suit],
                props.style
            ]}
        >
            <div style={style.rank}>
                {(props.hovered) ?
                    <div style={style.overlay}></div>
                : false}
                <div style={style.wrapper}>
                    {props.rank}
                </div>
            </div>
        </div>
    );
};

Card.defaultProps = {
    rank: null,
    suit: null,
    hovered: false,
    style: {}
};

Card.propTypes = {
    rank: PropTypes.string,
    style: PropTypes.object,
    hovered: PropTypes.bool,
    suit: PropTypes.string
};


const style = {
    base: {
        background: colors.faceOffCard,
        boxSizing: 'border-box',
        cursor: 'pointer',
        color: 'white',
        fontFamily: 'Montserrat',
        fontSize: '25px',
        fontWeight: '600',
        display: 'inline-block',
        height: '54px',
        marginRight: '0.4em',
        transition: 'all 300ms ease',
        position: 'relative',
        width: '37px'
    },
    overlay: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        background: 'grey',
        opacity: '0.3'
    },
    rank: {
        display: 'table',
        width: '100%',
        height: '100%',

    },
    wrapper: {
        display: 'table-cell',
        verticalAlign: 'middle',
        textAlign: 'center'
    },
    spade: {
        background: colors.spade
    },
    heart: {
        background: colors.heart
    },
    club: {
        background: colors.club
    },
    diamond: {
        background: colors.diamond
    }
};


export default Radium(Card);
