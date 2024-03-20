import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Navbar from '../../../HomePage/Navbar/Navbar';
import './BookingTime.scss';
import moment from 'moment';
import { LANGUAGES } from '../../../../utils';
import { getBookingTimeByDate, getBookingTimeBySeat } from '../../../../services/filmService';
import * as actions from '../../../../store/actions'
import BookingFilm from './BookingFilm';
import { withRouter } from 'react-router';
class BookingTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allTimes: [],
            allSeat: [],
            allCinemaTech: [],
            isShow: false,
            isOption: false,
            selectedAuthorId: '',
            isShowBF: false,
            inforDetailFilm: [],
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays,
        });
        this.props.fetchAllCinemaTechRedux();
        // this.props.fectAllTimeRedux()
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM");
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }

        if (prevProps.inforDetail !== this.props.inforDetail) {
            let inforDetailFilm = this.props.inforDetail;
            this.setState({
                inforDetailFilm: inforDetailFilm
            })
        }
        if (prevProps.allCinemaTechRedux !== this.props.allCinemaTechRedux) {
            let arrCinemaTech = this.props.allCinemaTechRedux;
            this.setState({
                allCinemaTech: arrCinemaTech,
            })
        }
        // if (prevProps.allTimeRedux !== this.props.allTimeRedux) {
        //     let arrTimes = this.props.allTimeRedux;
        //     this.setState({
        //         allTimes: arrTimes,
        //     })
        // }
        if (prevProps.filmIdFromParent !== this.props.filmIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let resTime = await getBookingTimeByDate()
            let resSeat = await getBookingTimeBySeat()
            this.setState({
                allSeat: resSeat.dataSeat ? resSeat.dataSeat : [],
                allTimes: resTime.dataTime ? resTime.dataTime : [],
                isShow: false,
            })
        }
    }
    handleOnChangeSelect = async (event, id) => {
        if (this.props.filmIdFromParent && this.props.filmIdFromParent !== -1) {
            let copyState = { ...this.state }
            copyState[id] = event.target.value;
            let date = copyState['day'];
            let filmId = this.props.filmIdFromParent;
            let cinemaTech = copyState['cinemaTech'];
            // let timeType = copyState['timeType'];
            let res = await getBookingTimeByDate(filmId, date, cinemaTech)
            if (res && res.errCode === 0) {
                this.setState({
                    ...copyState,
                    allTimes: res.dataTime ? res.dataTime : [],
                    isShow: true,
                    isOption: false,
                    isShowBF: false
                })
            }
            // console.log('res ', res)
        }
    }
    handleOnClickBookingSeat = async (film, event, id) => {
        if (this.props.filmIdFromParent && this.props.filmIdFromParent !== -1) {
            let copyState = { ...this.state }
            copyState[id] = event.target.value;
            let date = copyState['day'];
            let filmId = this.props.filmIdFromParent;
            let cinemaTech = copyState['cinemaTech'];
            let timeType = copyState['timeType'];
            let res = await getBookingTimeBySeat(filmId, date, cinemaTech, timeType)
            if (res && res.errCode === 0) {
                this.setState({
                    ...copyState,
                    allSeat: res.dataSeat ? res.dataSeat : [],
                    isShow: true,
                    isShowBF: false,
                })
            }
            // console.log('res ', res)
        }
        if (this.state.allSeat) {
            if (this.props.history) {
                this.props.history.push({
                    pathname: `/booking_movies/${film.id}`,
                    state: {
                        allSeat: this.state.allSeat,
                        allState: this.state
                    },
                });
            }
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
        let { allDays, allTimes, allCinemaTech, isShow, isOption, isShowBF } = this.state;
        let { language, inforDetail } = this.props;
        let uniqueTime = this.getUnique(allTimes, 'timeType')
        console.log('this.statebookingTime', this.state)
        let showNowShowingMovies = this.props.inforDetail.showId === "W1"

        return (
            <>
                {showNowShowingMovies &&
                    <div className="booking-time-container">
                        <div className="all-days">
                            <select onChange={(event) => this.handleOnChangeSelect(event, 'day')}
                                className="day">
                                {isOption === false && <option>Chọn ngày</option>}
                                {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}
                                            name
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="all-days">
                            <select onChange={(event) => this.handleOnChangeSelect(event, 'cinemaTech')}
                                className="cinemaTech">
                                {isOption === false && <option>Chọn rạp chiếu</option>}
                                {allCinemaTech && allCinemaTech.length > 0 && allCinemaTech.map((item, index) => {
                                    return (
                                        <option
                                            value={item.name}
                                            key={index}
                                        >
                                            {item.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="all-time">
                            <div className="text-calendar">
                                <i className="fas fa-calendar-check">
                                    <span>
                                        <FormattedMessage id="infor-film.time.booking-schedule" />
                                    </span>
                                </i>
                            </div>
                            {isShow === true && <div className="time-content">
                                {uniqueTime && uniqueTime.length > 0 ? uniqueTime.map((item, index) => {
                                    let timeDisplay = language === LANGUAGES.VI ? item.timeTypeDataAll.valueVi : item.timeTypeDataAll.valueEn
                                    // let timeTypeData
                                    return (
                                        <button
                                            value={item.timeType}
                                            key={index}
                                            className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                            onClick={(event) => this.handleOnClickBookingSeat(item, event, 'timeType')}
                                        >
                                            {timeDisplay}
                                        </button>
                                    )
                                }) :
                                    <div className="no-schedule">
                                        <FormattedMessage id="infor-film.time.no-schedule" />
                                    </div>
                                }

                            </div>}
                        </div>
                    </div>
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allCinemaTechRedux: state.film.allCinemaTechs,
        allTimeRedux: state.film.allTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCinemaTechRedux: () => dispatch(actions.fetchAllCinemaTech()),
        fectAllTimeRedux: () => dispatch(actions.fetchAllBookingTime()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingTime));
