import React, { PropTypes } from 'react';
import {validSelection, addCard, removeCard, clearCards, switchHandpickerMode } from '../../actions';
import { connect } from 'react-redux';
import UIButton from '../UIButton';
import utils from '../../utils/utils';
// import closeImage from '../../images/close.png';
import styles from '../../styles/handpicker.scss';
import modalBinding from '../decorators/modalBinding';
import RangePicker from './RangePicker';
import HandPickerSingle from './HandPickerSingle';
import SwitchButton from './SwitchButton';


const HandPicker = ({ ...props, onUnselect, onSelect, onClearCards, onSwitchHandPickerMode }) => {
    const clearStreet = () => {
        onClearCards(props.handpicker.mode);
        // if (props.handpicker.mode === 'single') {
        //     if (props.street === 'flop') {
        //         onClearFlop();
        //     } else if (props.street === 'turn') {
        //         onClearTurn();
        //     } else if (props.street === 'river') {
        //         onClearRiver();
        //     } else {
        //         onClearPlayer(props.street);
        //     }
        // }
    };

    const valid = () => {
        props.onValidSelection(props.handpicker[props.handpicker.mode], props.street);
        props.closeModal();
    };

    return (
        <div className={ styles.handpicker }>
            <div>
                <h3>{utils.capitalizeFirstLetter(props.street)}</h3>
                <SwitchButton
                    mode={ props.handpicker.mode }
                    callback={onSwitchHandPickerMode }
                />
            </div>
            <div>
                { (props.handpicker.mode === 'single') ?
                    <HandPickerSingle
                        cards={ props.cards }
                        selectedCards={ props.handpicker.single }
                        street={ props.street }
                        select={ onSelect }
                        unselect={ onUnselect }
                    />
                :
                    <RangePicker
                        street={ props.street }
                        cards={ props.handpicker.range }
                        select={ onSelect }
                        unselect={ onUnselect }
                    />
                }
            </div>
            <div className={ styles.footer }>
                <UIButton kind="clear" label="clear" onClick={clearStreet} kind="clear" />
                <UIButton className={ styles.valid } kind="valid" label="Ok" onClick={valid} />
            </div>
        </div>
    );
};

HandPicker.propTypes = {
    closeModal: PropTypes.func,
    cards: React.PropTypes.object,
    handpicker: React.PropTypes.object,
    street: React.PropTypes.string,
    onValidSelection: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    onClearCards: React.PropTypes.func,
    onSwitchHandPickerMode: React.PropTypes.func,
    onUnselect: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        handpicker: state.handpicker
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (card, street, mode) => dispatch(addCard(card, street, mode)),
        onValidSelection: (cards, street) => dispatch(validSelection(cards, street)),
        onClearCards: (mode) => dispatch(clearCards(mode)),
        onSwitchHandPickerMode: (mode) => dispatch(switchHandpickerMode(mode)),
        onUnselect: (card, street, mode) => dispatch(removeCard(card, street, mode))
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(modalBinding(HandPicker));
