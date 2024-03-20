import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Navbar from '../../HomePage/Navbar/Navbar';
import './InforNews.scss';
import { getInforNews } from '../../../services/filmService';
import { LANGUAGES } from '../../../utils'
import BookingTime from './Booking/BookingTime';
import * as actions from '../../../store/actions'
import Navbar_Infor from '../../../containers/Customer/Film/ChildComponent/Navbar_Infor';
import * as moment from 'moment';
import CustomScrollbars from '../../../components/CustomScrollbars';



class InforNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inforDetailNews: {},
            inforFilmOfNews: {},
            inforFilmOfNewsGenre: {},
            inforFilmOfNewsShow: {},
            currentNewsId: -1,
            arrMoviesNow: [],
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentNewsId: id
            })
            let res = await getInforNews(id)
            if (res && res.errCode === 0) {
                this.setState({
                    inforDetailNews: res.data,
                    inforFilmOfNews: res.data.filmNews,
                    inforFilmOfNewsGenre: res.data.filmNews.genreData,
                    inforFilmOfNewsShow: res.data.filmNews.showData
                })
            }
        }
        this.props.fetchMoviesNowShowingRedux();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allMoviesNowRedux !== this.props.allMoviesNowRedux) {
            let arrMoviesNows = this.props.allMoviesNowRedux
            this.setState({
                arrMoviesNow: arrMoviesNows,
            })
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    handleViewInforFilmNow = () => {
        if (this.props.history) {
            this.props.history.push(`/now-showing-movie`)
        }
    }
    handleViewInforFilm = (film) => {
        if (this.props.history) {
            this.props.history.push(`/infor_movies/${film.id}`)
        }
    }
    handleViewInforFilmComing = () => {
        if (this.props.history) {
            this.props.history.push(`/coming-soon-movie`)
        }
    }
    handleViewInforTotal = () => {
        let { inforFilmOfNews } = this.state
        if (this.props.history && inforFilmOfNews.showId === "W2") {
            this.props.history.push(`/coming-soon-movie`)
        } else {
            this.props.history.push(`/now-showing-movie`)
        }
    }
    render() {
        let { inforDetailNews, arrMoviesNow, inforFilmOfNews, inforFilmOfNewsGenre, inforFilmOfNewsShow } = this.state;
        let languages = this.props.language;
        console.log('inforFilmOfNews', this.state.inforFilmOfNews)
        let imageBase64s = '';
        if (inforFilmOfNews.image) {
            imageBase64s = new Buffer.from(inforFilmOfNews.image, 'base64').toString('binary');
        }
        return (
            <React.Fragment>
                <Navbar_Infor />
                <div className="switch-pages ">
                    <div className="switch-pages-content">
                        <div className="title-news">
                            <span>Nội dung tin tức</span>
                        </div>
                    </div>
                </div>
                <div className="container news-container">
                    <div className="content-news">
                        <div className="left-content-news">
                            <div className="news-movies">
                                <div className="title-news">
                                    <h2>{inforDetailNews.description}</h2>
                                </div>
                                <div className="author-news-time">
                                    <div className="time-news">
                                        {this.capitalizeFirstLetter(moment(inforDetailNews.createdAt).fromNow())}{' | '}
                                        {moment(inforDetailNews.createdAt).format('DD/MM/YYYY')}
                                    </div>
                                    <div className="author-news">
                                        <div className="image-author" style={{ backgroundImage: `url(${inforDetailNews.imageAuthor})` }}></div>
                                        <div className="name-author">{inforDetailNews.nameAuthor}</div>
                                    </div>
                                </div>
                                <div className="link-infor-movies">
                                    <div className="link-movies">
                                        <span className="linkone">Phim:<a href='#' onClick={() => this.handleViewInforFilm(inforFilmOfNews)}>
                                            {languages === LANGUAGES.VI ? inforFilmOfNews.nameVi : inforFilmOfNews.nameEn}                                            </a></span>
                                        <span className="linktwo">Công chiếu:<a href='#'
                                            onClick={() => this.handleViewInforTotal(inforFilmOfNews)}
                                        >
                                            {languages === LANGUAGES.VI ? inforFilmOfNewsShow.valueVi : inforFilmOfNewsShow.valueEn}
                                        </a></span>
                                    </div>
                                    <div className="author-news">
                                    </div>
                                </div>
                                <div className="main-news-movies">
                                    <div className="main-news-content">
                                        <div className="image-content">
                                            <div className="image-news" style={{ backgroundImage: `url(${inforDetailNews.imageNew})` }}></div>
                                        </div>
                                        <div className="main" dangerouslySetInnerHTML={{ __html: inforDetailNews.contentHTML }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="booking-movies">
                                <div className="movie-news-content">
                                    <div className="left">
                                        <div className="content-left">
                                            <div className="image-movie-news"
                                                style={{ backgroundImage: `url(${imageBase64s})` }}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="content-right">
                                            <div className="up">
                                                <span>
                                                    {languages === LANGUAGES.VI ? inforFilmOfNews.nameVi : inforFilmOfNews.nameEn}
                                                </span>
                                            </div>
                                            <div className="middle">
                                                <ul>
                                                    <li>
                                                        <span>Direction: </span>
                                                        <span>{inforFilmOfNews.director}</span>
                                                    </li>
                                                    <li>
                                                        <span>Actor: </span>
                                                        <span>{inforFilmOfNews.actor}</span>
                                                    </li>
                                                    <li>
                                                        <span>Genre: </span>
                                                        <span>

                                                            {languages === LANGUAGES.VI ? inforFilmOfNewsGenre.valueVi : inforFilmOfNewsGenre.valueEn}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>Release date: </span>
                                                        <span>{inforFilmOfNews.dayShow}</span>
                                                    </li>
                                                    <li>
                                                        <span>Duration: </span>
                                                        <span>{inforFilmOfNews.duration}</span>
                                                    </li>
                                                    <li>
                                                        <span>Language: </span>
                                                        <span>{inforFilmOfNews.language}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="down">
                                                <button className="btn-booking"
                                                    onClick={() => this.handleViewInforFilm(inforFilmOfNews)}
                                                >
                                                    {inforFilmOfNews.showId === "W2" ? <span>Xem chi tiet</span> : <span>Booking</span>}

                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                        <div className="right-content-outstanding">
                            <div className="list-now-contents">
                                <CustomScrollbars style={{ height: '490px' }}>
                                    <div className="title-now">
                                        <div className="title-content">
                                            <span>Phim đang chiếu nổi bật</span>
                                            <i className="fas fa-angle-double-right"
                                                onClick={() => this.handleViewInforFilmNow()}
                                            ></i>
                                        </div>
                                    </div>
                                    {arrMoviesNow && arrMoviesNow.length > 0 && arrMoviesNow.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer.from(item.image, 'base64').toString('binary');
                                        }
                                        return (
                                            <div className="list-now-content" key={index} >
                                                <div className="left">
                                                    <div className="content-left">
                                                        <div className="image-movies-now" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                                    </div>
                                                </div>
                                                <div className="right">
                                                    <div className="content-right">
                                                        <div className="up"><span>{languages === LANGUAGES.VI ? item.nameVi : item.nameEn}</span></div>
                                                        <div className="middle">
                                                            <ul>
                                                                <li>
                                                                    <span>Direction: </span>
                                                                    <span>{item.director}</span>
                                                                </li>
                                                                <li>
                                                                    <span>Actor: </span>
                                                                    <span>{item.actor}</span>
                                                                </li>
                                                                <li>
                                                                    <span>Genre: </span>
                                                                    <span>
                                                                        {languages === LANGUAGES.VI ? item.genreData.valueVi : item.genreData.valueEn}
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span>Release date: </span>
                                                                    <span>{item.dayShow}</span>
                                                                </li>
                                                                <li>
                                                                    <span>Duration: </span>
                                                                    <span>{item.duration}</span>
                                                                </li>
                                                                <li>
                                                                    <span>Language: </span>
                                                                    <span>{item.language}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="down">
                                                            <button className="btn-booking" onClick={() => this.handleViewInforFilm(item)}>
                                                                <span>Booking</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div className="last-background">
                                    </div>
                                </CustomScrollbars>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allMoviesNowRedux: state.film.allMoviesNow,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMoviesNowShowingRedux: () => dispatch(actions.fetchMoviesNowShowing()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InforNews);
