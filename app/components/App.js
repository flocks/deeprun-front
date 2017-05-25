import React, { PropTypes } from 'react';
import ModalsContainer from '../containers/ModalsContainer';
import Header from './Header';
// import Presentation from './Presentation';
import { app } from '../styles/app.scss';

const App = ({ children }) => (

    <div className={ app }>
        <Header />
        {/* <Presentation /> */}
        <ModalsContainer />
        { children }
    </div>
);

App.propTypes = {
    children: PropTypes.object
};


export default App;
