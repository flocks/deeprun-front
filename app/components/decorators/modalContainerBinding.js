import React, { PropTypes } from 'react';

let bindedKey;

const modalContainerBinding = function decorating(modalComponent) {
    class ModalDecorated extends React.Component {
        constructor() {
            super();
        }

        componentDidMount() {
            bindedKey = this.eventHandler.bind(this);
            document.addEventListener('keydown', bindedKey);
        }


        componentWillUnmount() {
            document.removeEventListener('keydown', bindedKey);
        }

        eventHandler(e) {
            if (e.keyCode === 27) {
                this.props.closeLastModal();
            }
        }


        render() {
            return modalComponent(this.props);
        }
    }

    ModalDecorated.propTypes = {
        closeLastModal: PropTypes.func
    };

    return ModalDecorated;
};

export default modalContainerBinding;

