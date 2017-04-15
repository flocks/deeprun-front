import React from 'react';
import colors from '../styles/colors';
import Radium from 'radium';

const Header = () => (
    <div style={style.base}>
        <div style={style.wrapper}>
            <h1 style={style.title}>Deeprun</h1>
            <h2 style={style.subtitle}>Just do the maths</h2>
        </div>
    </div>
);

const style = {
    base: {
        background: colors.header,
        display: 'table',
        height: '65px',
        boxShadow: '2px 1px 0 #F0EFF0',
        paddingLeft: '10%',
        boxSizing: 'border-box',
        width: '100%'
    },
    wrapper: {
        display: 'table-cell',
        verticalAlign: 'middle'
    },
    title: {
        fontSize: '1.3em',
        margin: '0',
        opacity: '0.7'
    },
    subtitle: {
        fontSize: '0.5em',
        fontStyle: 'italic',
        margin: '0',
        opacity: '0.6',
        fontWeight: 'normal'
    }

};

export default Radium(Header);
