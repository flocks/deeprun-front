import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { openModal, clearBoard } from '../actions';
import PlayerRow from '../components/PlayerRow';
import Board from '../components/Board'; import Radium from 'radium';
import UIButton from '../components/UIButton';
import Spinner from '../components/Spinner';
import utils from '../utils/utils';


const Home = ({onModal, cards, onClearBoard, equities}) => {
    const player1 = cards.player1;
    const player2 = cards.player2;

    return (
        <div style={style.base}>
            <PlayerRow
                label="player 1"
                equity={equities.player1}
                onClick={() => onModal('cardPicker', {street: 'player1'})}
                cards={player1}
            />
            <PlayerRow
                label="player 2"
                equity={equities.player2}
                onClick={() => onModal('cardPicker', {street: 'player2'})}
                cards={player2}
            />
            <Board
                onClick={(street) => onModal('cardPicker', {street: street})}
                cards={cards}
            />

            {(utils.isClearable(cards)) ?
                <UIButton
                    label="clear"
                    style={{position: 'absolute', left: '50%', margin: '15px -35px'}}
                    kind="clear"
                    onClick={() => onClearBoard()}
                />
            : false}
            <Spinner style={style.spinner} isLoading={equities.isLoading} />
        </div>
    );
};

Home.propTypes = {
    cards: PropTypes.object,
    equities: PropTypes.object,
    onModal: PropTypes.func,
    onClearBoard: PropTypes.func
};

Home.defaultProps = {
    cards: {
        player1: [],
        player2: [],
        flop: [],
        turn: {},
        river: {}
    }
};

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        equities: state.equities
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onModal: (modalId, data) => dispatch(openModal(modalId, data)),
        onClearBoard: () => dispatch(clearBoard())
    };
};

const style = {
    base: {
        maxWidth: '300px',
        margin: '50px auto',
        paddingLeft: '20px',
        width: '100%'
    },
    spinner: {
        position: 'absolute',
        top: '15px',
        left: '50%'
    }

};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Radium(Home));
