import React, { PropTypes } from 'react';
import styles from '../../styles/switchHandpickerMode.scss';
import cx from 'classnames';

const SwitchButton = ({ ...props }) => {
    const classNameSingle = cx(styles.option, {
        [styles.selected]: (props.mode === 'single')
    });

    const classNameRange = cx(styles.option, {
        [styles.selected]: (props.mode === 'range')
    });

    return (
        <div className={ styles.base }>
            <div className={ classNameSingle} onClick={ props.callback.bind(this, 'single')}>hand</div>
            <div className={ classNameRange } onClick={ props.callback.bind(this, 'range')}>range</div>
        </div>
    );
};

SwitchButton.propTypes = {
    mode: PropTypes.string,
    callback: PropTypes.func
};

export default SwitchButton;
