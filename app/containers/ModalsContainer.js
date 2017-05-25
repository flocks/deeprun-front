import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { closeModal } from '../actions';
import HandPicker from '../components/modals/HandPicker';


const ModalsContainer = ({ modals, onCloseModal }) => {
    let cardPicker = false;
    _.each(modals, (modal) => {
        switch (modal.modalId) {
            case 'cardPicker':
                cardPicker = (
                    <HandPicker
                        closeModal={() => onCloseModal('cardPicker') }
                        street={modal.data.street}
                    />
                );
                break;
            default:
        }
    });

    if (modals.length === 0) {
        return false;
    }

    return (
        <div>
            {cardPicker}
        </div>
    );
};

ModalsContainer.propTypes = {
    modals: PropTypes.array,
    onCloseModal: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        modals: state.modals
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseModal: (modalId) => dispatch(closeModal(modalId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalsContainer);


