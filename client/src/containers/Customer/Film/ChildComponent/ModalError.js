import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalError.scss'
import { LANGUAGES, MONEY } from '../../../../utils';

class ModalError extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        let { language, errorSeatVi, errorSeatEn } = this.props
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-error-container '}
                centered
                size="sm"
            >
                <ModalBody>
                    <div className="modal-error-content">
                        <div className="icon-error">
                            <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <div className="content-error">
                            <div className="title-error">
                                <FormattedMessage id="booking.error1" />
                                {language === LANGUAGES.VI ? errorSeatVi : errorSeatEn}
                                <FormattedMessage id="booking.error2" />
                            </div>
                            <div className="title-thanks">
                                <FormattedMessage id="booking.thanks" />
                            </div>
                        </div>
                    </div>
                </ModalBody>

            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalError);




