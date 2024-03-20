import React, { Component } from 'react';
import { connect } from "react-redux";
import Navbar_Infor from '../ChildComponent/Navbar_Infor';
import './NewsMovies.scss';
import { getInforFilm } from '../../../../services/filmService';
import { LANGUAGES, CommonUtils } from '../../../../utils'
import * as actions from '../../../../store/actions';
import CustomScrollbars from '../../../../components/CustomScrollbars';
import BookingTime from '../Booking/BookingTime';
import * as moment from 'moment'


class NewsMovies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewsMovies: [],
            arrMoviesNow: []
        }
    }
    componentDidMount() {
        this.props.fetchAllNewsMoviesRedux();
        this.props.fetchMoviesNowShowingRedux();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allNewsRedux !== this.props.allNewsRedux) {
            let allNewsRedux = this.props.allNewsRedux
            this.setState({
                arrNewsMovies: allNewsRedux,
            })
        }
        if (prevProps.allMoviesNowRedux !== this.props.allMoviesNowRedux) {
            let arrMoviesNows = this.props.allMoviesNowRedux
            this.setState({
                arrMoviesNow: arrMoviesNows,
            })
        }
    }
    handleViewInforNews = (news) => {
        if (this.props.history) {
            this.props.history.push(`/infor-news/${news.id}`)
        }
    }
    handleViewInforFilm = (film) => {
        if (this.props.history) {
            this.props.history.push(`/infor_movies/${film.id}`)
        }
    }
    handleViewInforFilmNow = (film) => {
        if (this.props.history) {
            this.props.history.push(`/now-showing-movie`)
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    render() {
        let { arrNewsMovies, arrMoviesNow } = this.state
        let languages = this.props.language
        console.log('arrNewsMovies', arrNewsMovies)
        return (
            <>
                <div className="news-container">
                    <div className="news-content">
                        <Navbar_Infor />
                        <div className="switch-pages ">
                            <div className="switch-pages-content">
                                <div className="title-news">
                                    <span>Tin tức phim</span>
                                </div>
                            </div>
                        </div>
                        {/* <BookingTime
                            filmIdFromParent={this.state.currentFilmId}
                            inforDetail={this.state.inforDetailFilm}
                        /> */}
                        <div className="list-news-movies">
                            <div className="container list-news-container">
                                <div className="list-news">
                                    {arrNewsMovies && arrNewsMovies.length > 0 && arrNewsMovies.map((item, index) => {
                                        let imageBase64New = '';
                                        if (item.imageNew) {
                                            imageBase64New = new Buffer.from(item.imageNew, 'base64').toString('binary');
                                        }
                                        let imageBase64Author = '';
                                        if (item.imageAuthor) {
                                            imageBase64Author = new Buffer.from(item.imageAuthor, 'base64').toString('binary');
                                        }
                                        return (
                                            <div className="list-news-content" key={index}>
                                                <div className="left">
                                                    <div className="content-left">
                                                        <div className="image-movies-news"
                                                            style={{ backgroundImage: `url(${imageBase64New})` }}
                                                        >
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right">
                                                    <div className="content-right">
                                                        <div className="up">
                                                            <span>
                                                                {item.description}
                                                            </span>
                                                        </div>
                                                        <div className="middle">
                                                            <div className="author">
                                                                <div className="img-author"
                                                                    style={{ backgroundImage: `url(${imageBase64Author})` }}
                                                                ></div>
                                                                <div className="name-author-time">
                                                                    <span>
                                                                        {item.nameAuthor}{' / '}{this.capitalizeFirstLetter(moment(item.createdAt).fromNow())}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="main-news"
                                                                dangerouslySetInnerHTML={{ __html: item.contentHTML }}
                                                            >
                                                            </div>
                                                        </div>
                                                        <div className="down">
                                                            <button className="btn-booking" onClick={() => this.handleViewInforNews(item)}>
                                                                <span>Xem chi tiết</span>
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                                <div className="list-now">
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

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allNewsRedux: state.film.allNew,
        allMoviesNowRedux: state.film.allMoviesNow,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllNewsMoviesRedux: () => dispatch(actions.fetchAllNews()),
        fetchMoviesNowShowingRedux: () => dispatch(actions.fetchMoviesNowShowing()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsMovies);
