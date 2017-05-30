import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { openModal, clearBoard } from '../actions';
import PlayerRow from '../components/PlayerRow';
import Board from '../components/Board';
import UIButton from '../components/UIButton';
import Spinner from '../components/Spinner';
import utils from '../utils/utils';
import styles from '../styles/home.scss';
import positions from '../styles/positions.scss';
import _ from 'lodash';


const range = _.range(1, 5);

const Home = ({onModal, cards, onClearBoard, equities}) => {
    return (
        <div className={ styles.home }>
            <div className={ styles.titles }>
                <span className={ styles.label }>Hands/Range</span>
                <span className={ styles.label }>Equities</span>
            </div>
            { _.map(range, (i) => {
                const p = 'player' + i;
                return (
                    <PlayerRow
                        key={p}
                        equity={equities[p]}
                        onClick={() => onModal('cardPicker', {street: p, cards: cards})}
                        cards={cards[p]}
                    />
                );
            })}
            <p className={ styles.label }>Board</p>
            <Board
                onClick={(street) => onModal('cardPicker', {street: street, cards: cards})}
                cards={cards}
            />

            {(utils.isClearable(cards)) ?
                <div className={ positions.marginTop20 }>
                    <UIButton
                        label="clear"
                        kind="clear"
                        onClick={() => onClearBoard()}
                    />
                </div>
            : false}
            <Spinner isLoading={equities.isLoading} />
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


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
