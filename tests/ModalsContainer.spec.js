import React from 'react';
import { mount } from 'enzyme';
import ModalsContainer from '../app/containers/ModalsContainer';
import { Provider } from 'react-redux';
import fakeStore from './helpers/fakeStore';

const zeroModalState = () => {
    return {
        modals: []
    };
};

const oneModalState = () => {
    return {
        modals: [{
            modalId: 'cardPicker',
            data: {
                street: 'flop'
            }
        }],
        cards: {
            player1: '',
            player2: '',
            player3: '',
            player4: '',
            flop: '',
            turn: '',
            river: ''
        },
        handpicker: {
            mode: 'single',
            range: '',
            single: ''
        }

    };
};

const oneModalWrongNameState = () => {
    return {
        modals: [{
            modalId: 'cardPicker-wrong',
            data: {
                street: 'flop'
            }
        }]
    };
};

describe('<ModalContainers />', () => {
    it('should render properly with 0 modal in state', () => {
        const component = mount(
            <ModalsContainer store={fakeStore(zeroModalState)} />
        );
        expect(component.children().length).toBe(0);
    });

    it('should render properly with the HandPicker in state', () => {
        const component = mount(
            <Provider store={fakeStore(oneModalState)}>
                <ModalsContainer store={fakeStore(oneModalState)} />
            </Provider>
        );
        expect(component.find('HandPicker').length).toBe(1);
    });

    it('should not render anything if modalId is wrong', () => {
        const component = mount(
            <ModalsContainer store={fakeStore(oneModalWrongNameState)} />
        );
        expect(component.children().length).toBe(0);
    });
});
