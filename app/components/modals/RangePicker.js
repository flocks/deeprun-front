import React, { PropTypes } from 'react';
import _ from 'lodash';
import UICardRange from '../UICardRange';
import utils from '../../utils/utils';


const RangePicker = ({ ...props }) => {
    const onSelect = (card, selected) => {
        if (!selected) {
            props.select(card,  props.street, 'range');
        } else {
            props.unselect(card,  props.street, 'range');
        }
    };

    const isSelected = (card) => {
        return (props.cards.indexOf(card) > -1);
    };

    const ranges = utils.generateRangeCards();

    return (
        <div>
            { _.map(ranges, (line, i) => {
                return (
                    <div key={i}>
                        { _.map(line, (range, j) => {
                            return (
                                <UICardRange
                                    key={j}
                                    selected={ isSelected(range.value) }
                                    onClick={ onSelect }
                                    suited={range.suited}
                                    pair={range.pair}
                                    range={range.value}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

RangePicker.propTypes = {
    cards: PropTypes.string,
    street: PropTypes.string
};

export default RangePicker;

