import { connect } from 'react-redux';
import './ContactUs.scss'
import "@fontsource/quicksand";
import React, { Component } from 'react';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';


class ContactUs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            messages: '',
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allContactRedux !== this.props.allContactRedux) {
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                messages: '',
            })
        }
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'messages']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                // console.log('Invalid' + arrCheck[i])
                alert('Invalid' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    handleOnChangeMessage = (event) => {
        this.setState({
            messages: event.target.value
        })
    }
    handleCreateContact = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        this.props.createContactUsRedux({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            messages: this.state.messages
        })
    }
    render() {
        let { firstName, lastName, email, messages } = this.state
        return (
            <div className="content-contact bg-opacity">
                <div className="container-contact">
                    <div className="row justify-content-center bg-contact">
                        <div className="col-md-12">
                            <div className="row align-items-center">
                                <div className="col-lg-6 ml-auto more-content">
                                    <div className="info-wrap w-100 p-5">
                                        <h3 className="mb-4"><FormattedMessage id="contact.contact-us" /></h3>
                                        <div className="dbox w-100 d-flex align-items-start">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <span className="fa fa-map-marker"></span>
                                            </div>
                                            <div className="text pl-4">
                                                <p><span><FormattedMessage id="contact.address" /></span>
                                                    <FormattedMessage id="contact.addess-content" /></p>
                                            </div>
                                        </div>
                                        <div className="dbox w-100 d-flex align-items-start">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <span className="fa fa-phone"></span>
                                            </div>
                                            <div className="text pl-4">
                                                <p><span><FormattedMessage id="contact.phone" /></span>
                                                    <a href="#"><FormattedMessage id="contact.phone-content" /></a></p>
                                            </div>
                                        </div>
                                        <div className="dbox w-100 d-flex align-items-start">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <span className="fa fa-paper-plane"></span>
                                            </div>
                                            <div className="text pl-4">
                                                <p><span><FormattedMessage id="contact.email" /></span>
                                                    <a href="#"><FormattedMessage id="contact.email-content" /></a></p>
                                            </div>
                                        </div>
                                        <div className="dbox w-100 d-flex align-items-start">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <span className="fa fa-globe"></span>
                                            </div>
                                            <div className="text pl-4">
                                                <p><span><FormattedMessage id="contact.website" /></span>
                                                    <a href="#"><FormattedMessage id="contact.website-content" /></a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="contact-wrap w-100 p-md-3 p-4">
                                        <h3 className="mb-4 title-contact"><FormattedMessage id="contact.get-in-touch" /></h3>
                                        {/* <div id="form-message-warning" className="mb-4"></div>
                                        <div id="form-message-success" className="mb-4">
                                            Your message was sent, thank you!
                                    </div> */}
                                        <form className="contactForm" id="contactForm"  >
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input type="text"
                                                            className="form-control"
                                                            name="firstName"
                                                            id="firstName"
                                                            placeholder="First Name"
                                                            value={firstName}
                                                            onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input type="text"
                                                            className="form-control"
                                                            name="lastName" id="lastName"
                                                            placeholder="Lats Name"
                                                            value={lastName}
                                                            onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input type="email"
                                                            className="form-control"
                                                            name="email"
                                                            id="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(event) => { this.onChangeInput(event, 'email') }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <textarea name="messages"
                                                            className="form-control"
                                                            id="messages" cols="30" rows="5"
                                                            placeholder="Message"
                                                            value={messages}
                                                            onChange={(event) => { this.handleOnChangeMessage(event) }}
                                                        ></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <div
                                                            className="btn btn-contact"
                                                            onClick={() => this.handleCreateContact()}
                                                        ><FormattedMessage id="contact.submit" /></div>
                                                        <div className="submitting"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allContactRedux: state.film.allContact
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllContactRedux: () => dispatch(actions.fetchAllContact()),
        createContactUsRedux: (data) => dispatch(actions.createContactUsAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
