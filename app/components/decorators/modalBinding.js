import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

let bindedClick;

const modalBinding = function decorating(ModalComponent) {
    class ModalDecorated extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            bindedClick = this.clickHandler.bind(this);
            document.addEventListener('click', bindedClick);
        }


        componentWillUnmount() {
            document.removeEventListener('click', bindedClick);
        }

        clickHandler(e) {
            const outside = !ReactDOM.findDOMNode(this).contains(e.target);
            if (outside) {
                this.props.closeModal();
            }
        }

        render() {
            return <ModalComponent {...this.props }/>;
        }
    }

    ModalDecorated.propTypes = {
        closeModal: PropTypes.func
    };

    return ModalDecorated;
};

export default modalBinding;

