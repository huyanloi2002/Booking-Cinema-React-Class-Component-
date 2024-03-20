import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingSeat.scss';
import { LANGUAGES, TRUEFALSE } from '../../../../utils';
import * as actions from '../../../../store/actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import { getBookingTimeByPrice, getBookingFilmBySeat } from '../../../../services/filmService'
class BookingSeat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectSeat: '',
            rangeSeat: [],
            counter: 0,
            arrFilmBySeat: [],
            seatArrs: []
        }
    }
    async componentDidMount() {
        // this.props.fetchAllSeatRedux();
        // this.props.stateSeat()
        if (this.props.propsAll && this.props.propsAll.location && this.props.propsAll.location.state
            && this.props.propsAll.location.state.allState && this.props.propsAll.location.state.allState.allSeat
        ) {
            let data = this.props.propsAll.location.state.allState.allSeat
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
                this.setState({
                    rangeSeat: data,
                });
            };
        };
        let filmId = this.props.propsAll.location.state.allState.inforDetailFilm.id
        let date = this.props.propsAll.location.state.allState.day
        let cinemaTech = this.props.propsAll.location.state.allState.cinemaTech
        let timeType = this.props.propsAll.location.state.allState.timeType
        let res = await getBookingFilmBySeat(filmId, date, cinemaTech, timeType)
        if (res && res.errCode === 0) {
            this.setState({
                arrFilmBySeat: res.dataSeatBooking ? res.dataSeatBooking : [],
            })
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    };
    handleOnClickBookingSeat = (seat) => {
        let { rangeSeat } = this.state
        if (rangeSeat && rangeSeat.length > 0) {
            rangeSeat = rangeSeat.map(item => {
                if (item.id === seat.id) {
                    item.isSelected = !item.isSelected
                } else {
                    item.isSelected = false
                }
                return item;
            })
            this.setState({
                rangeSeat: rangeSeat
            })
        }

    }
    getUnique(arr, comp) {
        const unique = arr.map(e => e[comp])
            // store the indexes of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the false indexes & return unique objects
            .filter((e) => arr[e]).map(e => arr[e]);

        return unique;
    }

    render() {
        this.props.inforSeat(this.state.rangeSeat)
        console.log('this', this.props)
        let { rangeSeat, seatChild, allSeat, arrFilmBySeat } = this.state;
        let { language } = this.props
        let seatedArrNormal = arrFilmBySeat.map(item => (item.seatType === 'SET1' ? { seat: item.seat1, isBooking: true, seat1: item.seat1 } : ""))
        let seatedArrVip = arrFilmBySeat.map(item => (item.seatType === 'SET2' ? { seat: item.seat1, isBooking: true, seat1: item.seat1 } : ""))
        let seatedArrDouble = arrFilmBySeat.map(item => (item.seatType === 'SET3' ? { seat: item.seat1, isBooking: true, seat1: item.seat1 } : ""))

        let arrSeatNormal = rangeSeat.filter(item => item.seatType === 'SET1')
        let arrSeatVip = rangeSeat.filter(item => item.seatType === 'SET2')
        let arrSeatDouble = rangeSeat.filter(item => item.seatType === 'SET3')
        //Normal
        let toCreateNormal = _.differenceWith(arrSeatNormal, seatedArrNormal, (a, b) => {
            return a.seat === b.seat
        });
        let newArrayNormal = toCreateNormal.concat(seatedArrNormal);
        let newArrayNormals = newArrayNormal.sort(function (a, b) {
            return ('' + a.seat).localeCompare(b.seat, 'en', { numeric: true });
        })
        //Vip
        let toCreateVip = _.differenceWith(arrSeatVip, seatedArrVip, (a, b) => {
            return a.seat === b.seat
        });
        let newArrayVip = toCreateVip.concat(seatedArrVip);
        let newArrayVips = newArrayVip.sort(function (a, b) {
            return ('' + a.seat).localeCompare(b.seat, 'en', { numeric: true });
        })
        //Double
        let toCreateDouble = _.differenceWith(arrSeatDouble, seatedArrDouble, (a, b) => {
            return a.seat === b.seat
        });
        let newArrayDouble = toCreateDouble.concat(seatedArrDouble);
        let newArrayDoubles = newArrayDouble.sort(function (a, b) {
            return ('' + a.seat).localeCompare(b.seat, 'en', { numeric: true });
        })
        return (
            <div className="booking-seat">
                <div className="image-sreen">
                </div>
                <div className="booking-seat-container">
                    <div className="content-seats">
                        <div className="all-seat">
                            <div className="seat-normal">
                                {
                                    newArrayNormals && newArrayNormals.length > 0 && newArrayNormals.slice(0, 40).map((item, index) => {
                                        let nameSeatNormal = item.seat
                                        return (
                                            <button
                                                onClick={() => {
                                                    this.handleOnClickBookingSeat(item);
                                                }}
                                                disabled={item.seat === item.seat1 ? "disabled" : ""}
                                                key={index}
                                                className={
                                                    item.isSelected === true ?
                                                        "btn-seat-normal active"
                                                        : "btn-seat-normal"

                                                }
                                            >
                                                <span>{nameSeatNormal}</span>
                                            </button>
                                        )


                                    })
                                }

                            </div>
                            <div className="seat-vip-one">
                                {newArrayVips && newArrayVips.length > 0 && newArrayVips.slice(0, 40).map((item, index) => {
                                    let nameSeatVip = item.seat
                                    return (
                                        <button
                                            onClick={() => this.handleOnClickBookingSeat(item)}
                                            value={item.seat}
                                            key={index}
                                            disabled={item.seat === item.seat1 ? "disabled" : ""}
                                            className={item.isSelected === true ?
                                                "btn-seat-vip-one active"
                                                : "btn-seat-vip-one"}
                                        >
                                            <span>{nameSeatVip}</span>
                                        </button>
                                    )
                                })}
                            </div>
                            {/* <div className="seat-vip-two">
                                {arrSeatVip && arrSeatVip.length > 0 && arrSeatVip.slice(20, 40).map((item, index) => {
                                    let nameSeat = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                    return (
                                        <button
                                            onClick={() => this.handleClickBtnSeat(item)}
                                            key={index}
                                            className={item.isSelected === true ?
                                                "btn-seat-vip-two active"
                                                : "btn-seat-vip-two"
                                            }
                                        >
                                            <span>{nameSeat}</span>
                                        </button>
                                    )
                                })}
                            </div> */}
                            <div className="seat-double">
                                <div className="seat-double-content">
                                    {newArrayDoubles && newArrayDoubles.length > 0 && newArrayDoubles.slice(0, 8).map((item, index) => {
                                        let nameSeatBouble = item.seat
                                        return (
                                            <button
                                                onClick={() => this.handleOnClickBookingSeat(item)}
                                                value={item.seat}
                                                key={index}
                                                disabled={item.seat === item.seat1 ? "disabled" : ""}
                                                className={item.isSelected === true ?
                                                    "btn-seat-double active"
                                                    : "btn-seat-double"}
                                            >
                                                <span>{nameSeatBouble}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="note-seat">
                    <div className="note-seat-content">
                        <div className="up">
                            <div className="note">
                                <div className="note-normal"></div>
                                <span>Ghế thường</span>
                            </div>
                            <div className="note">
                                <div className="note-vip"></div>
                                <span>Ghế vip</span>
                            </div>
                        </div>
                        <div className="middle">
                            <div className="note">
                                <div className="note-double"></div>
                                <span>Ghế đôi</span>
                            </div>
                            <div className="note">
                                <div className="note-seated"></div>
                                <span>Ghế đã đặt</span>
                            </div>
                        </div>
                        <div className="down">
                            <div className="note">
                                <div className="note-seating"></div>
                                <span>Ghế đang đặt</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingSeat);
