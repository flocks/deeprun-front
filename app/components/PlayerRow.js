import React, { PropTypes } from 'react';
import Radium from 'radium';
import global from '../styles/global';
import UICard from './UICard';

const PlayerRow = ({ ...props }) => {
    return (
        <div style={style.base} onClick={props.onClick}>
            <div>
                <UICard card={props.cards[0]} />
                <UICard card={props.cards[1]} />
            </div>

            <p style={global.label}>{props.label}</p>
            {(props.equity) ?
                <div style={style.equity}> {props.equity}%</div>
            :
                <div style={[style.equity, style.equity_null]}>%</div>
            }
        </div>
    );
};

PlayerRow.defaultProps = {
    cards: [{}, {}],
    equity: null,
    onClick: function() {}
};

PlayerRow.propTypes = {
    label: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    equity: PropTypes.number,
    onClick: PropTypes.func
};

const style = {
    base: {
        textAlign: 'left',
        position: 'relative',
        marginBottom: '20px',

    },
    equity: {
        color: 'grey',
        position: 'absolute',
        fontSize: '35px',
        fontFamily: 'Montserrat',
        fontWeight: '800',
        right: '25px',
        top: '5px'
    },
    equity_null: {
        opacity: '0.1'
    }
};

export default Radium(PlayerRow);
