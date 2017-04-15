import React, { PropTypes} from 'react';
import Card from './Card';

const DealtCards = ({ ...props }) => (
    <div>
        <Card rank={props.cards[0].rank} suit={props.cards[0].suit} />
        <Card rank={props.cards[1].rank} suit={props.cards[1].suit} />
    </div>
);

DealtCards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
};

DealtCards.defaultProps = {
    cards: [{}, {}]
};


export default DealtCards;
