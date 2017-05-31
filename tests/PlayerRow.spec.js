import React from 'react';
import renderer from 'react-test-renderer';
import PlayerRow from '../app/components/PlayerRow';


describe('<PlayerRow />', () => {
    it('should render properly with empty value', () => {
        const component = renderer.create(
            <PlayerRow
                label="player 1"
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render properly with cards', () => {
        const cards = 'AhKd';
        const component = renderer.create(
            <PlayerRow
                label="player 1"
                equity={45}
                cards={cards}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
