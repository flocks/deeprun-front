import React, { PropTypes } from 'react';
import Radium from 'radium';
import global from '../styles/global';
import UICard from './UICard';

const Board = ({...props}) => {
    return (
        <div style={style.base}>
            <div style={[style.common, style.flop]} onClick={props.onClick.bind(this, 'flop')}>
                <UICard card={props.cards.flop[0]} />
                <UICard card={props.cards.flop[1]} />
                <UICard card={props.cards.flop[2]} />
                <p style={global.label}>Flop</p>
            </div>
            <div style={[style.common, style.turn]}>
                <UICard
                    card={props.cards.turn}
                    onClick={props.onClick.bind(this, 'turn')}
                />
                <p style={global.label}>Turn</p>
            </div>
            <div style={style.common}>
                <UICard
                    card={props.cards.river}
                    onClick={props.onClick.bind(this, 'river')}
                />
                <p style={global.label}>River</p>
            </div>
        </div>
    );
};

Board.defaultProps = {
    onClick: () => {},
    cards: {
        flop: [{}, {}, {}],
        turn: {},
        river: {}
    }
};
Board.propTypes = {
    onClick: PropTypes.func,
    cards: PropTypes.object
};

const style = {
    base: {
        marginTop: '50px'
    },
    common: {
        display: 'inline-block'
    },
    flop: {
        marginRight: '30px'
    },
    turn: {
        marginRight: '20px'
    }
};

export default Radium(Board);
