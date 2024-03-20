import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import './PaypalCheckOut.scss';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import moment from 'moment';
import * as actions from '../../store/actions'

class PaypalCheckOut extends Component {

    constructor(props) {
        super(props);
        let { language } = this.props
        this.state = {
            nameFilm: '',
            dates: '',
            inforSeat: this.props.inforBookingPay.inforSeat,
            inforCombo: this.props.inforBookingPay.inforCombo,
            inforDetailSeat: this.props.inforBookingFilm.location.state.allSeat,
            FilmId: this.props.inforBookingFilm.location.state.allState.inforDetailFilm.id,
            timeType: this.props.inforBookingFilm.location.state.allState.timeType,
            dayTimeStamp: this.props.inforBookingFilm.location.state.allState.day,
            email: this.props.userInfo.email,
            Film: this.props.inforBookingFilm.location.state.allState.inforDetailFilm,
            cinemaTech: this.props.inforBookingFilm.location.state.allState.cinemaTech,
            emailUser: this.props.userInfo.email,
            lastName: this.props.userInfo.lastName,
            firstName: this.props.userInfo.firstName,
            phonenumber: this.props.userInfo.phonenumber,
            address: this.props.userInfo.address,
            gender: language === LANGUAGES.VI ? this.props.userInfo.genderDataUser.valueVi : this.props.userInfo.genderDataUser.valueEn,
            totalSeatPaypal: 0,
            totalComboPaypal: 0,
            totalPromotionPaypal: 0,
            detailSeats: '',
            detailHourss: '',
            keyMapSeat: '',
            seatType: '',
            coutCombo1: 0,
            coutCombo2: 0,
            coutCombo3: 0,
            totalCombo1: 0,
            totalCombo2: 0,
            totalCombo3: 0,
            detailCombo1: '',
            detailCombo2: '',
            detailCombo3: '',
            totalPrice: 0
        }
    }
    componentDidMount() {
        let { language } = this.props
        let { Film, inforDetailSeat, inforSeat, inforCombo,
        } = this.state
        {
            inforSeat && inforSeat.length > 0 && inforSeat.map((item) => {
                let pricePaypalSeat = parseFloat(item.priceDataAll.valueEn)
                let detailSeat = item.seatDataAll.valueEn
                let detailHours = item.timeTypeDataAll.valueEn
                let keyMapSeats = item.seat
                let seatTypes = item.seatType
                if (item.isSelected === true) {
                    this.setState({
                        totalSeatPaypal: pricePaypalSeat,
                        detailSeats: detailSeat,
                        detailHourss: detailHours,
                        keyMapSeat: keyMapSeats,
                        seatType: seatTypes,
                    })

                }
            })
        }
        {
            inforCombo && inforCombo.length > 0 && inforCombo.map((item, index) => {
                let pricePaypalCombo = parseFloat(item.priceDataCombo.valueEn)
                let detailCombo = item.name
                let coutCombos = item.cout
                if (index === 0) {
                    this.setState({
                        totalCombo1: pricePaypalCombo * item.cout,
                        detailCombo1: detailCombo,
                        coutCombo1: coutCombos,
                    })
                }
                else if (index === 1) {
                    this.setState({
                        totalCombo2: pricePaypalCombo * item.cout,
                        detailCombo2: detailCombo,
                        coutCombo2: coutCombos,
                    })
                }
                else if (index === 2) {
                    this.setState({
                        totalCombo3: pricePaypalCombo * item.cout,
                        detailCombo3: detailCombo,
                        coutCombo3: coutCombos,
                    })
                }

            })
        }
        let day = moment(inforDetailSeat.date).format('DD/MM/YYYY')
        this.setState({
            nameFilm: language === LANGUAGES.VI ? Film.nameVi : Film.nameEn,
            dates: day,
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.totalCombo1 !== this.state.totalCombo1 ||
            prevState.totalCombo2 !== this.state.totalCombo2 ||
            prevState.totalCombo3 !== this.state.totalCombo3
        ) {
            let { totalCombo1, totalCombo2, totalCombo3 } = this.state
            this.setState({
                totalComboPaypal: Number((totalCombo3 + totalCombo2 + totalCombo1).toFixed(2))
            })
        }
        if (prevState.totalComboPaypal !== this.state.totalComboPaypal ||
            prevState.totalPromotionPaypal !== this.state.totalPromotionPaypal ||
            prevState.totalSeatPaypal !== this.state.totalSeatPaypal
        ) {
            let { totalComboPaypal, totalPromotionPaypal, totalSeatPaypal } = this.state
            this.setState({
                totalPrice: Number((totalComboPaypal + totalPromotionPaypal + totalSeatPaypal).toFixed(2))
            })
        }

    }
    handleClickBillToPDF = () => {
        if (this.props.inforBookingFilm.history)
            this.props.inforBookingFilm.history.push({
                pathname: '/bill-to-pdf',
                state: {
                    arrFilm: this.state,
                },
            });
    }
    render() {
        let { nameFilm, detailHourss, dates, cinemaTech, detailSeats,
            detailCombo1, detailCombo2, detailCombo3, dayTimeStamp,
            totalPrice, FilmId, email, timeType, keyMapSeat, seatType, totalSeatPaypal,
            coutCombo1, coutCombo2, coutCombo3, totalCombo1, totalCombo2, totalCombo3
        } = this.state
        console.log('e', this.state)
        return (
            <PayPalScriptProvider>
                <PayPalButtons
                    style={{
                        layout: 'horizontal',
                        color: 'gold',
                        tagline: 'false',
                        label: 'pay'
                    }}
                    onClick={(data, actions) => {
                        let hasAlreadyBoughtCourse = false
                        if (hasAlreadyBoughtCourse) {
                            alert("You Alreacdy bought this course")
                            return actions.reject()
                        } else {
                            return actions.resolve()
                        }
                    }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    description:
                                        nameFilm + ', ' +
                                        detailHourss + ', ' +
                                        dates + ', ' +
                                        cinemaTech + ', ' +
                                        detailSeats + ', ' +
                                        detailCombo1 + ', ' +
                                        detailCombo2 + ', ' +
                                        detailCombo3,
                                    amount: {
                                        value: totalPrice,
                                    }
                                }
                            ]
                        })
                    }}
                    onApprove={async (data, actions) => {
                        let order = await actions.order.capture()
                        console.log("order", order);
                        alert('Thank you for your purchase!')
                        this.props.createBookingRedux({
                            filmId: FilmId,
                            email: email,
                            timeType: timeType,
                            date: dayTimeStamp,
                            cinemaTech: cinemaTech,
                            seat1: keyMapSeat,
                            seatType: seatType,
                            totalSeat: totalSeatPaypal,
                            combo1: detailCombo1,
                            combo2: detailCombo2,
                            combo3: detailCombo3,
                            coutCombo1: coutCombo1,
                            coutCombo2: coutCombo2,
                            coutCombo3: coutCombo3,
                            totalCombo1: totalCombo1,
                            totalCombo2: totalCombo2,
                            totalCombo3: totalCombo3,
                            totalAll: totalPrice,
                            payment: 'PAYPAL',
                            statusId: 'ĐÃ THANH TOÁN',
                        })
                        this.handleClickBillToPDF()
                    }}
                    onCancel={() => { }}
                    onError={(err) => {
                        alert("Paypal Checkout Errorr")
                        console.log('Paypal Checkout Errorr', err)
                    }}
                />
            </PayPalScriptProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createBookingRedux: (data) => dispatch(actions.createBookingAction(data))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaypalCheckOut));
