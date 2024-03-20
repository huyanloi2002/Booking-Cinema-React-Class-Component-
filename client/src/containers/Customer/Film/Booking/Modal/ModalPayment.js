import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalPayment.scss'
import { LANGUAGES } from '../../../../../utils';
import PaypalCheckOut from '../../../../Payment/PaypalCheckOut';

class ModalPayment extends Component {

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
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-buy-combo-container'}
                size="lg"
                centered
            >
                <ModalBody>
                    <div className="payment">
                        <div className="payment-main">
                            <div className="title-payment">
                                <label>Bước 2:</label>
                                <span>HÌNH THỨC THANH TOÁN</span>
                            </div>
                            <div className="content-payment">
                                <PaypalCheckOut
                                    inforBookingPay={this.props.inforBooking}
                                    inforBookingFilm={this.props.inforFilmBooking}
                                />
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

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPayment);




