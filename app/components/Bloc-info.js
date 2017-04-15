import React, { PropTypes } from 'react';
import Radium, { Style } from 'radium';
import colors from '../styles/colors';

const BlocInfo = ({ children }) => (
    <div style={style.base}>
        <Style
            rules={{
                strong: {
                    color: colors.heart,
                    textDecoration: 'underline'
                },
                a: {
                    color: colors.diamond,
                    textDecoration: 'none'
                },
                h3: {
                    color: colors.subtitle_block
                }
            }}

        />
        { children }
    </div>
);

BlocInfo.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
};

const style = {
    base: {
        background: 'white',
        borderRadius: '3px',
        fontSize: '13px',
        boxShadow: '2px 1px 0 #F0EFF0',
        maxWidth: '300px',
        padding: '10px',
        position: 'absolute',
        top: '104px',
        left: '9%'
    }
};

export default Radium(BlocInfo);
