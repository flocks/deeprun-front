import React from 'react';
import renderer from 'react-test-renderer';
import UICard from '../app/components/UICard';

describe('<UICard />', () => {
    it('Empty cards should render properly', () => {
        const component = renderer.create(
            <UICard />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Empty card should render properly', () => {
        const component = renderer.create(
            <UICard />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Disabled card should render properly', () => {
        const component = renderer.create(
            <UICard card={{rank: '3', suit: 'spade'}} disabled />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Selected cards should render properly', () => {
        const spade = renderer.create(
            <UICard card={{rank: '8', suit: 'spade'}} selected />
        );

        let tree = spade.toJSON();
        expect(tree).toMatchSnapshot();

        const heart = renderer.create(
            <UICard card={{rank: '8', suit: 'heart'}}  selected />
        );

        tree = heart.toJSON();
        expect(tree).toMatchSnapshot();

        const diamond = renderer.create(
            <UICard card={{rank: '8', suit: 'diamond'}} selected />
        );

        tree = diamond.toJSON();
        expect(tree).toMatchSnapshot();

        const club = renderer.create(
            <UICard card={{rank: '8', suit: 'club'}} selected />
        );

        tree = club.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('cards should render properly', () => {
        const spade = renderer.create(
            <UICard card={{rank: '8', suit: 'spade'}} />
        );

        let tree = spade.toJSON();
        expect(tree).toMatchSnapshot();

        const heart = renderer.create(
            <UICard card={{rank: '8', suit: 'heart'}} />
        );

        tree = heart.toJSON();
        expect(tree).toMatchSnapshot();

        const diamond = renderer.create(
            <UICard card={{rank: '8', suit: 'diamond'}} />
        );

        tree = diamond.toJSON();
        expect(tree).toMatchSnapshot();

        const club = renderer.create(
            <UICard card={{rank: '8', suit: 'club'}}/>
        );

        tree = club.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
