import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingFilm.scss';
import { LANGUAGES, MONEY, TRUEFALSE } from '../../../../utils';
import * as actions from '../../../../store/actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import {
    Stepper,
    Step,
    StepLabel,
    // Button,
    Typography,
    CircularProgress
} from '@material-ui/core';
import moment from 'moment';
import BookingSeat from './BookingSeat';
import BookingBuyCombo from './BookingBuyCombo';
import BookingPay from './BookingPay';
import Steppers from '../ChildComponent/Steppers';
import Navbar_Infor from '../../../../containers/Customer/Film/ChildComponent/Navbar_Infor';
import ModalError from '../ChildComponent/ModalError';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ModalPayment from './Modal/ModalPayment';


class BookingFilm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSeat: [],
            currentStep: 0,
            step: [],
            inforDetail: [],
            inforSeat: [],
            inforCombo: [],
            isShowModalError: false,
            seatErrorVi: 'GHẾ NGỒI',
            seatErrorEn: 'SEAT',
            totalSeat: 0,
            totalCombo: 0,
            totalPromotion: 0,
            detailSeats: '',
            detailHourss: '',
            isOpenModalPayment: false
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.inforSeat !== this.state.inforSeat) {
            let inforSeats = this.state.inforSeat
            this.setState({
                inforPriceSeat: inforSeats
            })
        }
        // if (prevState.inforCombo !== this.state.inforCombo) {
        //     let inforCombos = this.state.inforCombo
        //     this.setState({
        //         inforDetalCombo: inforCombos
        //     })
        // }
    }
    handleCallSeat = (seat) => {
        this.setState({ inforSeat: seat })
    }
    handleCallCombo = (combo) => {
        this.setState({ inforCombo: combo })
    }

    handleFetchModalError = () => {
        this.setState({
            isShowModalError: true
        })
    }
    toggleModalError = () => {
        this.setState({
            isShowModalError: !this.state.isShowModalError,
        })
    }
    handleFetchModalPayment = () => {
        this.setState({
            isOpenModalPayment: true
        })
    }
    toggleModalModalPayment = () => {
        this.setState({
            isOpenModalPayment: !this.state.isOpenModalPayment,
        })
    }
    handleNext = () => {
        let { currentStep, inforPriceSeat, isShowModalError } = this.state
        if (currentStep === 2) {
            this.handleFetchModalPayment()
        }
        else if (currentStep === 0) {
            if (inforPriceSeat && inforPriceSeat.length > 0) {
                inforPriceSeat.map(item => {
                    if (item.isSelected === false) {
                        this.handleFetchModalError()
                    } else {
                        currentStep = currentStep + 1
                    }
                })
            }
        }
        else {
            currentStep = currentStep + 1

        }
        this.setState({
            currentStep
        })
    }
    handlePrev = () => {
        let { currentStep } = this.state
        currentStep = currentStep - 1
        this.setState({
            currentStep
        })
    }
    getUnique(arr, comp) {
        const unique = arr.map(e => e[comp])
            // store the indexes of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the false indexes & return unique objects
            .filter((e) => arr[e]).map(e => arr[e]);

        return unique;
    }
    getStepItems = (steps) => {
        switch (steps) {
            case 0:
                return (
                    <BookingSeat
                        stateSeat={this.props.location.state.allSeat}
                        handleNext={this.handleNext}
                        propsAll={this.props}
                        inforSeat={this.handleCallSeat}
                    />
                );
            case 1:
                return (
                    <BookingBuyCombo
                        handleNext={this.handleNext}
                        handlePrev={this.handlePrev}
                        // propsAll={this.props}
                        inforCombo={this.handleCallCombo}
                    />
                );
            case 2:
                return (
                    <BookingPay
                        statePay={this.state}
                        propsAll={this.props}
                    // onTime={this.onTime}
                    />
                );
            default:
                break;
        }
    }
    render() {
        let stepss = [
            <FormattedMessage id="booking.choose-seat" />,
            <FormattedMessage id="booking.choose-corn-water" />,
            <FormattedMessage id="booking.payment" />
        ]
        let inforDetailFilm = this.props.location.state.allState.inforDetailFilm
        let inforDetailSeat = this.props.location.state.allSeat
        let inforDetailcinemaTech = this.props.location.state.allState.cinemaTech
        let { inforSeat, inforCombo, totalCombo, totalPromotion, totalSeat, detailSeats, detailHourss } = this.state;
        let timeType = moment(inforDetailSeat.date).format('DD/MM/YYYY');
        let { language } = this.props;
        console.log("e", inforDetailSeat)
        return (
            <React.Fragment>
                <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
                    <Navbar_Infor />
                    <div className="container container-film">
                        <div className="content-booking-films col-md-12">
                            <Stepper activeStep={this.state.currentStep} className={Steppers.stepper}>
                                {stepss.map(label => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <div className="container-booking col-md-12">
                                <div className="step-booking">
                                </div>
                                {this.getStepItems(this.state.currentStep)}
                            </div>
                            <div className="btn-container col-md-12">
                                <div className="total-infor">
                                    {this.state.currentStep !== 0 && <button className="btn-prev col-md-1"
                                        onClick={() => this.handlePrev()}
                                    >
                                        <i className="fas fa-angle-double-left">
                                        </i><FormattedMessage id="booking.PREV" />
                                    </button>}
                                    <div className="content-booking-film col-md-10">
                                        <div className="left-infor-film col-md-4">
                                            <div className="left">
                                                <div className="image-film"
                                                    style={{ backgroundImage: `url(${inforDetailFilm.image})` }}
                                                >
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="name-film">
                                                    {language === LANGUAGES.VI ? inforDetailFilm.nameVi : inforDetailFilm.nameEn}
                                                </div>
                                                <div className="genre">
                                                    {language === LANGUAGES.VI ? inforDetailFilm.genreData.valueVi : inforDetailFilm.genreData.valueEn}
                                                </div>
                                                <div className="dayShow">{inforDetailFilm.dayShow}</div>
                                                <div className="duration">{inforDetailFilm.duration}</div>
                                            </div>
                                        </div>
                                        <div className="middle-time-seat col-md-4">
                                            <div className="cinema">
                                                <div className="title-name-booking col-md-6">
                                                    <FormattedMessage id="booking.cinema" />
                                                </div>
                                                <div className="infor-booking">
                                                    <FormattedMessage id="booking.CINE-DALAT" />
                                                </div>
                                            </div>
                                            <div className="day">
                                                <div className="title-name-booking  col-md-6">
                                                    <FormattedMessage id="booking.time" />
                                                </div>
                                                <div className="infor-booking">
                                                    {inforSeat && inforSeat.length > 0 && inforSeat.map((item) => {
                                                        let detailHours = language === LANGUAGES.VI ? item.timeTypeDataAll.valueVi : item.timeTypeDataAll.valueEn
                                                        if (item.isSelected === true) {
                                                            detailHourss = detailHours
                                                        }

                                                    })}
                                                    {timeType}
                                                    {' '}
                                                    {detailHourss}
                                                </div>
                                            </div>
                                            <div className="cinemaTech">
                                                <div className="title-name-booking  col-md-6">
                                                    <FormattedMessage id="booking.room" />
                                                </div>
                                                <div className="infor-booking">{inforDetailcinemaTech}</div>
                                            </div>
                                            <div className="seat">
                                                <div className="title-name-booking  col-md-1">
                                                    <FormattedMessage id="booking.seat" />
                                                </div>
                                                {inforSeat && inforSeat.length > 0 && inforSeat.map((item) => {
                                                    let detailSeat = item.seat
                                                    if (item.isSelected === true) {
                                                        detailSeats = detailSeat
                                                        return (
                                                            <div className="infor-booking-detail-seat" >{detailSeats}</div>
                                                        )
                                                    }

                                                })}

                                            </div>
                                        </div>
                                        <div className="right-price  col-md-3">
                                            <div className="price-ticket">
                                                <div className="title-name-booking col-md-5">
                                                    <FormattedMessage id="booking.price" />
                                                </div>
                                                {inforSeat && inforSeat.length > 0 && inforSeat.map((item) => {
                                                    let priceSeat = language === LANGUAGES.VI ? item.priceDataAll.valueVi : parseFloat(item.priceDataAll.valueEn)
                                                    if (item.isSelected === true) {
                                                        totalSeat += priceSeat
                                                    }
                                                })}
                                                <div className="infor-booking" >{language === LANGUAGES.VI ? totalSeat + MONEY.DONG : totalSeat + MONEY.DOLLAR}</div>
                                            </div>
                                            <div className="combo-drink-food ">
                                                <div className="title-name-booking col-md-5">
                                                    <FormattedMessage id="booking.combo" />
                                                </div>
                                                {inforCombo && inforCombo.length > 0 && inforCombo.map((item) => {
                                                    let price = language === LANGUAGES.VI ? item.priceDataCombo.valueVi : parseFloat(item.priceDataCombo.valueEn)
                                                    if (item.cout) {
                                                        totalCombo += price * item.cout
                                                    }
                                                })}
                                                <div className="infor-booking" >{language === LANGUAGES.VI ? totalCombo + MONEY.DONG : totalCombo + MONEY.DOLLAR}</div>
                                            </div>
                                            <div className="promotion">
                                                <div className="title-name-booking col-md-5">
                                                    <FormattedMessage id="booking.promotion" />
                                                </div>
                                                <div className="infor-booking">{language === LANGUAGES.VI ? totalPromotion + MONEY.DONG : totalPromotion + MONEY.DOLLAR}</div>
                                            </div>
                                            <div className="total-price">
                                                <div className="title-name-booking col-md-5">
                                                    <FormattedMessage id="booking.total" />
                                                </div>
                                                <div className="infor-booking">{language === LANGUAGES.VI ?
                                                    totalCombo + totalSeat + totalPromotion + MONEY.DONG : Number((totalSeat + totalCombo + totalPromotion).toFixed(2)) + MONEY.DOLLAR}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.currentStep === 0 && <button className="btn-next col-md-1"
                                        onClick={() => this.handleNext()}
                                    ><FormattedMessage id="booking.NEXT" />
                                        <i className="fas fa-angle-double-right">
                                        </i>
                                        <ModalError
                                            isOpen={this.state.isShowModalError}
                                            toggleFromParent={this.toggleModalError}
                                            errorSeatVi={this.state.seatErrorVi}
                                            errorSeatEn={this.state.seatErrorEn}
                                        />
                                    </button>}
                                    {this.state.currentStep === 1 && <button className="btn-next col-md-1"
                                        onClick={() => this.handleNext()}
                                    ><FormattedMessage id="booking.NEXT" />
                                        <i className="fas fa-angle-double-right">
                                        </i>
                                    </button>}
                                    {this.state.currentStep === 2 && <button className="btn-next col-md-1"
                                        onClick={() => this.handleNext()}
                                    ><FormattedMessage id="booking.PAYMENT" />
                                        <i className="fas fa-angle-double-right">
                                        </i>
                                        <ModalPayment
                                            isOpen={this.state.isOpenModalPayment}
                                            toggleFromParent={this.toggleModalModalPayment}
                                            inforBooking={this.state}
                                            inforFilmBooking={this.props}
                                        />
                                    </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </PayPalScriptProvider >
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createBookingRedux: (data) => dispatch(actions.createBookingAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingFilm);
