import React, { PropTypes } from 'react';
import Radium from 'radium';
import colors from '../styles/colors';

const UICard = ({ ...props }) => {
    const handleClick = () => {
        if (!props.disabled) {
            props.onClick();
        }
    };

    return (
        <div
            onClick={handleClick}
            style={[
                Object.assign({}, style.base, props.style.base),
                (props.card.suit) && style[props.card.suit].base,
                (props.disabled) && Object.assign({}, style.disabled, props.style.disabled),
                (props.selected) && Object.assign({}, style[props.card.suit].selected)]}
        >
            <div style={style.wrapper}>{props.card.rank}</div>
        </div>
    );
};

UICard.defaultProps = {
    card: {
        rank: null,
        suit: null
    },
    onClick: function onClick() {},
    hover: false,
    disabled: false,
    selected: false,
    style: {
        base: {},
        club: {},
        diamond: {},
        spade: {},
        heart: {},
    }
};

UICard.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    hover: PropTypes.bool,
    card: PropTypes.object,
    selected: PropTypes.bool,
    style: PropTypes.object
};

const style = {
    base: {
        background: colors.faceOffCard,
        boxSizing: 'border-box',
        borderWidth: '4px',
        borderColor: colors.faceOffBorderCard,
        borderStyle: 'solid',
        color: 'white',
        textAlign: 'center',
        cursor: 'pointer',
        display: 'inline-block',
        height: '54px',
        lineHeight: '45px',
        marginRight: '5px',
        fontFamily: 'Montserrat',
        fontWeight: '800',
        fontSize: '25px',
        verticalAlign: 'bottom',
        transition: 'all 200ms linear',
        width: '40px'
    },
    spade: {
        base: {
            background: colors.spade,
            borderColor: colors.spade
        },
        selected: {
            borderColor: colors.spade_selected
        }
    },
    heart: {
        base: {
            background: colors.heart,
            borderColor: colors.heart
        },
        selected: {
            borderColor: colors.heart_selected
        }
    },
    club: {
        base: {
            background: colors.club,
            borderColor: colors.club
        },
        selected: {
            borderColor: colors.club_selected
        }
    },
    diamond: {
        base: {
            background: colors.diamond,
            borderColor: colors.diamond
        },
        selected: {
            borderColor: colors.diamond_selected
        }
    },
    disabled: {
        opacity: '0.2',
        cursor: 'normal'
    }
};

export default Radium(UICard);
