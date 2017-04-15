import React from 'react';
import Board from '../app/components/Board';
import { mount } from 'enzyme';
import sinon from 'sinon';

describe('<Board />', () => {
    it('should render 5 cards', () => {
        const component = mount(
            <Board />
        );

        expect(component.find('UICard').length).toBe(5);
    });

    it('click on a card of flop should callback with "flop"', () => {
        const callback = sinon.spy();

        const component = mount(
            <Board onClick={callback} />
        );

        const card1 = component.find('UICard').at(0);
        card1.simulate('click');

        expect(callback.calledOnce).toBe(true);
        expect(callback.getCalls()[0].args[0]).toEqual('flop');
    });

    it('click on a card of turn should callback with "turn"', () => {
        const callback = sinon.spy();

        const component = mount(
            <Board onClick={callback} />
        );

        const card1 = component.find('UICard').at(3);
        card1.simulate('click');

        expect(callback.calledOnce).toBe(true);
        expect(callback.getCalls()[0].args[0]).toEqual('turn');
    });

    it('click on a card of river should callback with "river"', () => {
        const callback = sinon.spy();

        const component = mount(
            <Board onClick={callback} />
        );

        const card1 = component.find('UICard').at(4);
        card1.simulate('click');

        expect(callback.calledOnce).toBe(true);
        expect(callback.getCalls()[0].args[0]).toEqual('river');
    });
});
