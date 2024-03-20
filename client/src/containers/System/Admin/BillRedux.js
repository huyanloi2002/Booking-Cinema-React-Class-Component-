import { right } from '@popperjs/core';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { getBookingAll } from '../../../services/filmService';
import { CRUD_ACTIONS, LANGUAGES, CommonUtils, MONEY } from "../../../utils"
import './BillRedux.scss';
import moment from 'moment';

class BillRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allBooking: []
        }
    }
    async componentDidMount() {
        let res = await getBookingAll()
        if (res && res.errCode === 0) {
            this.setState({
                allBooking: res.dataBookingAll ? res.dataBookingAll : []
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { allBooking } = this.state
        let { language } = this.props
        console.log('e', allBooking)
        return (
            <>
                <div className="history-content-user">
                    <div className="history">
                        <div className="title-history">
                            <span> QUẢN LÝ HÓA ĐƠN</span>
                        </div>
                        <div className="fresh-table full-color-orange">
                            <table id="fresh-table" className="table">
                                <thead>
                                    <th >Time</th>
                                    <th >Description</th>
                                    <th >Total All</th>
                                    <th >Status</th>
                                </thead>
                                <tbody>
                                    {allBooking && allBooking.length > 0 && allBooking.map((item, index) => {
                                        let email = item.email
                                        let DayBooking = moment(item.createdAt).format('HH:mm DD/MM/YYYY');
                                        let nameMovie = language === LANGUAGES.VI ? item.filmBooking.nameVi : item.filmBooking.nameEn
                                        let cinemaTech = item.cinemaTech
                                        let dates = moment(item.date).format('DD/MM/YYYY');
                                        let timeTypeBook = language === LANGUAGES.VI ? item.timeTypeBooking.valueVi : item.timeTypeBooking.valueEn
                                        let seatBook = item.seat1
                                        let totalSeat = item.totalSeat
                                        let totalPriceAll = item.totalAll
                                        let payment = item.payment
                                        let status = item.statusId
                                        let combo1 = ""
                                        let combo2 = ""
                                        let combo3 = ""
                                        let coutCombo1 = item.coutCombo1
                                        let coutCombo2 = item.coutCombo2
                                        let coutCombo3 = item.coutCombo3
                                        let totalCombo1 = item.totalCombo1
                                        let totalCombo2 = item.totalCombo2
                                        let totalCombo3 = item.totalCombo3
                                        if (coutCombo1 >= 1) {
                                            combo1 = item.combo1
                                            totalCombo1 = item.totalCombo1
                                            coutCombo1 = item.coutCombo1
                                        } else {
                                            combo1 = ""
                                            totalCombo1 = ""
                                            coutCombo1 = ""
                                        }
                                        if (coutCombo2 >= 1) {
                                            combo2 = item.combo2
                                            totalCombo2 = item.totalCombo2
                                            coutCombo2 = item.coutCombo2
                                        } else {
                                            combo2 = ""
                                            totalCombo2 = ""
                                            coutCombo2 = ""
                                        }
                                        if (coutCombo3 >= 1) {
                                            combo3 = item.combo3
                                            totalCombo3 = item.totalCombo3
                                            coutCombo3 = item.coutCombo3
                                        }
                                        else {
                                            combo3 = ""
                                            totalCombo3 = ""
                                            coutCombo3 = ""
                                        }
                                        return (
                                            <tr key={index}>
                                                <td>{DayBooking}<br />{email}</td>
                                                <td className="description">
                                                    <div className="booking-infor">
                                                        <div className="content-book">
                                                            <div className="cine"><span className="title-book">Rạp: </span><span >Cine Dalat</span></div>
                                                            <div className="film"><span className="title-book">Tên phim: </span>  <span > {nameMovie}</span></div>
                                                            <div className="cinemaTech"><span className="title-book">Công nghệ chiếu: </span><span > {cinemaTech}</span></div>
                                                            <div className="dayShow"><span className="title-book">Ngày chiếu: </span> <span> {dates}</span></div>
                                                            <div className="timType"><span className="title-book">Thời gian chiếu: </span><span > {timeTypeBook}</span></div>
                                                            <div className="seated"><span className="title-book">Ghế đã đặt: </span> <span>  {seatBook} </span></div>
                                                            <div className="priceSeat"><span className="title-book">Giá ghế: </span><span > {totalSeat + MONEY.DOLLAR} </span></div>
                                                        </div>
                                                    </div>
                                                    <div className="combo-infor">
                                                        <div className="combo-content">
                                                            <div className="title-combo">
                                                                <div> <span>ĐA/NU: </span></div>
                                                                <div> <span>SL: </span></div>
                                                                <div><span>Giá: </span></div>
                                                            </div>
                                                            <div className="combo-total">
                                                                <div><span className="combo">{combo1}</span><span className="cout">{coutCombo1}</span><span className="total">{totalCombo1}</span></div>
                                                                <div><span className="combo">{combo2}</span><span className="cout">{coutCombo2}</span><span className="total">{totalCombo2}</span></div>
                                                                <div><span className="combo">{combo3}</span><span className="cout">{coutCombo3}</span><span className="total">{totalCombo3}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{totalPriceAll + MONEY.DOLLAR}</td>
                                                <td>
                                                    <div className="status-content">
                                                        <span className="payment">{payment}</span>
                                                        <br /><span className="status">{status}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillRedux);
