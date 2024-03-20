import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingPay.scss';
import { LANGUAGES, MONEY, TRUEFALSE } from '../../../../utils';
import * as actions from '../../../../store/actions';
import Countdown from '../ChildComponent/Countdown';
import PaypalCheckOut from '../../../Payment/PaypalCheckOut';


class BookingPay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrPaymentType: [],
            isShowPromotion: false,
            totalSeat: 0.00,
            totalCombo: 0.00,
            totalPromotion: 0.00,
            detailSeats: '',
            detailCombos: '',
            reload: false,
        }
    }
    componentDidMount() {
    };
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleClickPromotion = () => {
        this.setState({
            isShowPromotion: !this.state.isShowPromotion
        })
    }
    onTime = () => {
        // this.refreshPage()
    }
    refreshPage = () => {
        window.location.reload();
    };

    render() {
        let inforSeat = this.props.statePay.inforSeat
        let inforCombo = this.props.statePay.inforCombo;
        let { isShowPromotion, totalCombo, totalSeat, totalPromotion, detailSeats, detailCombos, timeCountdown } = this.state
        let { language } = this.props;
        return (
            <>
                <div className="booking-pay-container col-md-12">
                    <div className="booking-pay-content col-md-12">
                        <div className="row">
                            <div className="booking-pay col-md-12">
                                <div className="payment-content col-md-8">
                                    <div className="promotion">
                                        <div className="promotion-main">
                                            <div className="title-promotion">
                                                <label>Bước 1:</label>
                                                <span>GIẢM GIÁ</span>
                                            </div>
                                            <div className="content-promotion">
                                                <div className="title-code-promotion"
                                                    onClick={() => this.handleClickPromotion()}
                                                >Mã khuyến mãi</div>
                                                {isShowPromotion === true && <div className="input-code-promotion">
                                                    <div className="left">
                                                        <label>Nhập mã khuyến mãi</label>
                                                        <input className="input-promotion"></input>
                                                    </div>
                                                    <div className="right">
                                                        <button className="btn-promotion">Sử dụng</button>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="total-content col-md-4">
                                    <div className="total-ticket-food">
                                        <div className="total-ticket-food-main">
                                            <div className="up-ttf">TỔNG CỘNG</div>
                                            <div className="midle-ttf">
                                                {inforSeat && inforSeat.length > 0 && inforSeat.map((item, index) => {
                                                    let priceSeat = language === LANGUAGES.VI ? item.priceDataAll.valueVi : parseFloat(item.priceDataAll.valueEn)
                                                    if (item.isSelected === true) {
                                                        totalSeat += priceSeat
                                                    }
                                                })}
                                                <div className="left"> <FormattedMessage id="booking.price" /></div>
                                                {inforSeat && inforSeat.length > 0 && inforSeat.map((item, index) => {
                                                    let detailSeat = item.seat
                                                    if (item.isSelected === true) {
                                                        detailSeats = detailSeat
                                                        return (
                                                            <div className="middle" >{detailSeats + ','}</div>
                                                        )
                                                    }

                                                })}
                                                <div className="right">
                                                    <div className="infor-booking" >{language === LANGUAGES.VI ? totalSeat + MONEY.DONG : totalSeat + MONEY.DOLLAR}</div>
                                                </div>
                                            </div>
                                            <div className="down-ttf">
                                                {inforCombo && inforCombo.length > 0 && inforCombo.map((item, index) => {
                                                    let priceCombo = language === LANGUAGES.VI ? item.priceDataCombo.valueVi : parseFloat(item.priceDataCombo.valueEn)
                                                    if (item.cout) {
                                                        totalCombo += priceCombo * item.cout
                                                    }
                                                })}
                                                <div className="left"> <FormattedMessage id="booking.combo" /></div>
                                                {inforCombo && inforCombo.length > 0 && inforCombo.map((item, index) => {
                                                    let detailCombo = item.name
                                                    if (item.cout) {
                                                        detailCombos = detailCombo
                                                        return (
                                                            <div className="middle" >{detailCombos + ','}</div>
                                                        )
                                                    }

                                                })}
                                                <div className="right">
                                                    <div className="infor-booking" >{language === LANGUAGES.VI ? totalCombo + MONEY.DONG : totalCombo + MONEY.DOLLAR}</div>
                                                </div>
                                            </div>
                                            <div className="final-ttf">{language === LANGUAGES.VI ? totalSeat + totalCombo + MONEY.DONG : Number((totalSeat + totalCombo).toFixed(2)) + MONEY.DOLLAR}</div>
                                        </div>
                                    </div>
                                    <div className="total-promotion">
                                        <div className="total-promotion-main">
                                            <div className="up-tp">KHUYẾN MÃI</div>
                                            <div className="down-tp">{language === LANGUAGES.VI ? totalPromotion + MONEY.DONG : totalPromotion + MONEY.DOLLAR}</div>
                                        </div>
                                    </div>
                                    <div className="total-all">
                                        <div className="total-all-main">
                                            <div className="up-ta">TỔNG SỐ TIỀN THANH TOÁN</div>
                                            <div className="down-ta">
                                                {
                                                    language === LANGUAGES.VI ?
                                                        totalSeat + totalCombo + totalPromotion + MONEY.DONG :
                                                        Number((totalSeat + totalCombo + totalPromotion).toFixed(2)) + MONEY.DOLLAR
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="coutdown-clock">
                                        <Countdown
                                            onTime={this.onTime}
                                            duration={300}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingPay);
