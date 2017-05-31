import React from 'react';
import { mount} from 'enzyme';
import Home from '../app/containers/Home';
import fakeStore from './helpers/fakeStore';
import { Provider } from 'react-redux';


const getState = () => ({
    cards: {
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        flop: '',
        turn: '',
        river: ''
    },
    equities: {}
    
});

describe('<Home />', () => {
    it('should have 4 PlayerRow components', () => {
        const component = mount(
            <Home store={fakeStore(getState)}/>
        );

        expect(component.find('PlayerRow').length).toBe(4);
    });

    it('should display a Board', () => {
        const component = mount(
            <Home store={fakeStore(getState)}/>
        );

        expect(component.find('Board').length).toBe(1);
    });

    it('should map dispatch to props', () => {
        const store = fakeStore(getState);

        const component = mount(
            <Provider store={store}>
                <Home store={fakeStore(getState)}/>
            </Provider>
        );

        expect(component.find('Home').props().onModal).toBeDefined();
    });
});
