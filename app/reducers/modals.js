import * as types from '../actions/types';
import _ from 'lodash';

const modals = (state = [], action) => {
    switch (action.type) {
        case types.OPEN_MODAL:
            const modal = {
                modalId: action.modalId,
                data: action.data
            };

            return state.concat(modal);
        case types.CLOSE_MODAL:
            return _.filter(state, (m) => {
                return m.modalId !== action.modalId;
            });
        default:
            return state;
    }
};


export default modals;
