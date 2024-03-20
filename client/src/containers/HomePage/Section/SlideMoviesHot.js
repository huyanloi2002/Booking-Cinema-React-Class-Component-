import React, { Component } from 'react';
import { connect } from 'react-redux';
import "@fontsource/quicksand";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import "./SlideMoviesHot.scss";
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

class SlideMoviesHot extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrFilms: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allMoviesNowRedux !== this.props.allMoviesNowRedux) {
            this.setState({
                arrFilms: this.props.allMoviesNowRedux,
            })
        }
    }
    componentDidMount() {
        this.props.fetchMoviesNowShowingRedux();
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
    render() {
        let arrTopFilms = this.state.arrFilms;
        let { language } = this.props
        return (
            <section className="section-swiper">
                <div className="title-hot-movies">
                    <span className="title-content">
                        <FormattedMessage id="outstanding.title-outstanding" />
                    </span>
                    <button className="btn-seemore-outstanding"
                        onClick={() => this.handleViewInforFilmNow()}
                    >
                        <span><FormattedMessage id="outstanding.see-more-outstanding" /></span>
                    </button>
                </div>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={0}
                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    pagination={{
                        clickable: true,
                    }}
                    speed={1000}
                    autoplay=
                    {{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation, Autoplay]}
                    breakpoints={{
                        // when window width is <= 499px
                        250: {
                            slidesPerView: 1,
                            spaceBetweenSlides: 10
                        },
                        550: {
                            slidesPerView: 2,
                            spaceBetweenSlides: 30
                        },
                        830: {
                            slidesPerView: 3,
                            spaceBetweenSlides: 30
                        },

                        // when window width is <= 999px
                        999: {
                            slidesPerView: 4,
                            spaceBetweenSlides: 30
                        }
                    }}
                    className="mySwiper"
                >
                    {arrTopFilms && arrTopFilms.length > 0
                        && arrTopFilms.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            }
                            let genreVi = `${item.genreData.valueVi}`;
                            let genreEn = `${item.genreData.valueEn}`;
                            let nameFilmVI = `${item.nameVi}`
                            let nameFilmEN = `${item.nameEn}`
                            return (
                                <SwiperSlide><div className="card" key={index} onClick={() => this.handleViewInforFilm(item)}>
                                    <div className="image" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                    <div className="card-content">
                                        <div className="title-movie">
                                            <div className="name">{language === LANGUAGES.VI ? nameFilmVI : nameFilmEN}</div>
                                            <div className="genre">({language === LANGUAGES.VI ? genreVi : genreEn})</div>
                                            <div className="time">{item.duration}</div>
                                        </div>
                                        <div className="rating">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                        </div>
                                        <div className="button">
                                            <button className="booking">Booking</button>
                                            <button className="detail">Detail</button>
                                        </div>
                                    </div>
                                </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>

            </section>


        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allMoviesNowRedux: state.film.allMoviesNow,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMoviesNowShowingRedux: () => dispatch(actions.fetchMoviesNowShowing()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SlideMoviesHot));
