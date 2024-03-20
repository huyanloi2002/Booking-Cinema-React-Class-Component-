import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageBooking.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkBookingTime } from '../../../services/filmService'
import { fetchAllSeat } from '../../../store/actions';


class ManageBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrFilm: [],
            arrCinemaTechs: [],
            arrTime: [],
            arrPrice: [],
            arrSeatType: [],
            selectedFilmBooking: {},
            selectedCinemaTech: '',
            selectedTime: '',
            selectedPrice: '',
            selectedSeatType: '',
            currentDate: '',
            rangeSeat: [],
        }
    }
    componentDidMount() {
        this.props.fetchAllFilmsRedux();
        this.props.fectAllTimeRedux();
        this.props.fetchAllCinemaTechRedux();
        this.props.fetchAllSeatRedux();
        this.props.fetchAllPriceRedux();
        this.props.fetchAllSeatTypeRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allFilms !== this.props.allFilms) {
            let dataSelectFilm = this.buildDataInputSelect(this.props.allFilms, 'FILMS')
            this.setState({
                arrFilm: dataSelectFilm
            })
        }
        if (prevProps.allCinemaTechs !== this.props.allCinemaTechs) {
            let dataSelectCinemaTech = this.buildDataInputSelect(this.props.allCinemaTechs, 'CINEMATECH')
            this.setState({
                arrCinemaTechs: dataSelectCinemaTech
            })
        }
        if (prevProps.allTimes !== this.props.allTimes) {
            let dataSelectTime = this.buildDataInputSelect(this.props.allTimes, 'TIME')
            this.setState({
                arrTime: dataSelectTime
            })
        }
        if (prevProps.allPrices !== this.props.allPrices) {
            let dataSelectPrice = this.buildDataInputSelect(this.props.allPrices, 'PRICE')
            this.setState({
                arrPrice: dataSelectPrice
            })
        }
        if (prevProps.allSeatTypes !== this.props.allSeatTypes) {
            let dataSelectSeatType = this.buildDataInputSelect(this.props.allSeatTypes, 'SEATTYPE')
            this.setState({
                arrSeatType: dataSelectSeatType
            })
        }
        if (prevProps.allSeats !== this.props.allSeats) {
            let data = this.props.allSeats
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeSeat: data
            })
        }
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            if (type === 'FILMS') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.nameVi}`
                    let labelEn = `${item.nameEn}`
                    let labels = `${item.name}`
                    let itemId = `${item.id}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = itemId;
                    result.push(object)
                })
            }
            if (type === 'CINEMATECH') {
                inputData.map((item, index) => {
                    let object = {}
                    let labels = `${item.name}`
                    let itemId = `${item.id}`
                    object.label = labels;
                    object.value = labels;
                    result.push(object)
                })
            }
            if (type === 'TIME') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`
                    object.label = language == LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`
                    object.label = language == LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'SEATTYPE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`
                    object.label = language == LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
        }
        return result;
    }
    handleChangeSelectFilm = async (selectedOption) => {
        this.setState({ selectedFilmBooking: selectedOption });
    };
    handleChangeSelect = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (seat) => {
        let { rangeSeat } = this.state;
        if (rangeSeat && rangeSeat.length > 0) {
            rangeSeat = rangeSeat.map(item => {
                if (item.id === seat.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeSeat: rangeSeat
            })
        }
    }
    handleSaveCustomerBooking = async () => {
        let { rangeSeat,
            selectedFilmBooking,
            currentDate, selectedCinemaTech,
            selectedTime, selectedPrice,
            selectedSeatType }
            = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Invalid date!");
            return;
        }
        if (selectedFilmBooking && _.isEmpty(selectedFilmBooking)) {
            toast.error("Invalid selected film booking!");
            return;
        }
        if (selectedCinemaTech && _.isEmpty(selectedCinemaTech)) {
            toast.error("Invalid selected cinema technology booking!");
            return;
        }
        if (selectedTime && _.isEmpty(selectedTime)) {
            toast.error("Invalid selected time booking!");
            return;
        }
        if (selectedPrice && _.isEmpty(selectedPrice)) {
            toast.error("Invalid selected price booking!");
            return;
        }
        if (selectedSeatType && _.isEmpty(selectedSeatType)) {
            toast.error("Invalid selected seat type booking!");
            return;
        }
        let formatedDate = new Date(currentDate).getTime();
        if (rangeSeat && rangeSeat.length > 0) {
            let selectSeat = rangeSeat.filter(item => item.isSelected === true)
            if (selectSeat && selectSeat.length > 0) {
                selectSeat.map(booking => {
                    let object = {}
                    object.filmId = selectedFilmBooking.value;
                    object.cinemaTech = selectedCinemaTech.value;
                    object.seatType = selectedSeatType.value;
                    object.date = formatedDate;
                    object.timeType = selectedTime.value;
                    object.price = selectedPrice.value;
                    object.seat = booking.keyMap;
                    result.push(object)
                });
            }
            else {
                toast.error("Invalid selected time!");
                return;
            }

        }
        let res = await saveBulkBookingTime({
            arrBookingTime: result,
            seatType: selectedSeatType.value,
            timeType: selectedTime.value,
            price: selectedPrice.value,
            cinemaTech: selectedCinemaTech.value,
            filmId: selectedFilmBooking.value,
            formatedDate: formatedDate,
        })
        if (res && res.errCode === 0) {
            toast.success('Save booking time succeed !')
        } else {
            toast.error('Save booking time error !')
            console.log('Save booking time error >>> e: ', res)
        }
    }
    render() {
        let listArrFilm = this.state.arrFilm
        let listArrCinemaTech = this.state.arrCinemaTechs
        let listArrTime = this.state.arrTime
        let listArrPrice = this.state.arrPrice
        let listArrSeatType = this.state.arrSeatType
        console.log('listArrSeatType', listArrSeatType)
        let { rangeSeat } = this.state
        let { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        return (
            <div className="plan-booking-container">
                <div className="p-b-title">
                    <FormattedMessage id="manage-customer-booking.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-customer-booking.choose-movie" /></label>
                            <Select
                                value={this.state.selectedFilmBooking}
                                onChange={this.handleChangeSelectFilm}
                                options={listArrFilm}
                                className="select-film"
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-customer-booking.choose-date" /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Chọn công nghệ</label>
                            <Select
                                value={this.state.selectedCinemaTech}
                                onChange={this.handleChangeSelect}
                                options={listArrCinemaTech}
                                className="select-film"
                                name="selectedCinemaTech"
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Chọn thời gian(giờ chiếu)</label>
                            <Select
                                value={this.state.selectedTime}
                                onChange={this.handleChangeSelect}
                                options={listArrTime}
                                className="select-film"
                                name="selectedTime"
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Chọn giá cả</label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelect}
                                options={listArrPrice}
                                className="select-film"
                                name="selectedPrice"
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Chọn loại ghế</label>
                            <Select
                                value={this.state.selectedSeatType}
                                onChange={this.handleChangeSelect}
                                options={listArrSeatType}
                                className="select-film"
                                name="selectedSeatType"
                            />
                        </div>
                        <fieldset className="col-12 pick-seat-container">
                            <div className="content-seat">
                                <legend>Chọn ghế: </legend>
                                {rangeSeat && rangeSeat.length > 0 && rangeSeat.map((item, index) => {
                                    return (
                                        <button
                                            onClick={() => this.handleClickBtnTime(item)}
                                            className={item.isSelected === true ?
                                                "btn btn-seat-booking active"
                                                : "btn btn-seat-booking"}
                                            key={index}>{
                                                language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                            }</button>
                                    )
                                })}
                            </div>
                        </fieldset>
                        <div className="col-md-12">
                            <button className="btn btn-primary btn-save-time col-2"
                                onClick={() => this.handleSaveCustomerBooking()}
                            >
                                <FormattedMessage id="manage-customer-booking.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allFilms: state.film.allFilms,
        allTimes: state.film.allTime,
        allCinemaTechs: state.film.allCinemaTechs,
        allSeats: state.film.allSeat,
        allPrices: state.film.allPrice,
        allSeatTypes: state.film.allSeatType
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllFilmsRedux: () => dispatch(actions.fetchAllFilms()),
        fectAllTimeRedux: () => dispatch(actions.fetchAllBookingTime()),
        fetchAllCinemaTechRedux: () => dispatch(actions.fetchAllCinemaTech()),
        fetchAllSeatRedux: () => dispatch(actions.fetchAllSeat()),
        fetchAllPriceRedux: () => dispatch(actions.fetchAllPrice()),
        fetchAllSeatTypeRedux: () => dispatch(actions.fetchAllSeatType())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
