import React, { PropTypes } from 'react';
import styles from '../styles/spinner.scss';
// import cx from 'classnames';

const Spinner = ({ ...props }) => {
    // let dot1 = cx(styles.dot, styles.dot1);
    // let dot2 = cx(styles.dot, styles.dot2);
    // let dot3 = cx(styles.dot, styles.dot3);

    if (props.isLoading) {
        return (
            <div className={ styles.container }>
                <div className={ styles.dot }></div>
                <div className={ styles.dot }></div>
                <div className={ styles.dot }></div>
            </div>);
    }

    return false;
};

Spinner.defaultProps = {
    isLoading: false
};

Spinner.propTypes = {
    isLoading: PropTypes.bool
};

export default Spinner;
