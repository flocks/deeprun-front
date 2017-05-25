import React, { PropTypes } from 'react';
import colors from '../styles/colors';


const Card = ({ ...props }) => {
    return (
        <div >
            <div>
                {(props.hovered) ?
                    <div></div>
                : false}
                <div>
                    {props.rank}
                </div>
            </div>
        </div>
    );
};

Card.defaultProps = {
    rank: null,
    suit: null,
    hovered: false,
    style: {}
};

Card.propTypes = {
    rank: PropTypes.string,
    style: PropTypes.object,
    hovered: PropTypes.bool,
    suit: PropTypes.string
};



export default Card;
