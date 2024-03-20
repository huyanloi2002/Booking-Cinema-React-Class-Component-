import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Banner.scss'
import "@fontsource/quicksand";
import React, { Component } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrBanners: []
        }
    }
    componentDidMount() {
        this.props.loadBannerRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.loadBanner !== this.props.loadBanner) {
            this.setState({
                arrBanners: this.props.loadBanner,
            })
        }
    }
    handleViewInforFilm = (film) => {
        if (this.props.history) {
            this.props.history.push(`/infor_movies/${film.filmId}`)
        }
    }
    render() {
        let arrBannerFilm = this.state.arrBanners
        let language = this.props.language
        return (
            <section className="content-banner">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    speed={2000}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper">
                    {arrBannerFilm && arrBannerFilm.length > 0 && arrBannerFilm.map((item, index) => {
                        let imageBase64 = '';
                        if (item.imagebanner) {
                            imageBase64 = new Buffer.from(item.imagebanner, 'base64').toString('binary');
                        }
                        let nameVi = `${item.Film.nameVi}`
                        let nameEn = `${item.Film.nameEn}`
                        return (
                            <SwiperSlide>
                                <div className="container-banners" key={index}>
                                    <div className="banners" style={{ backgroundImage: `url(${imageBase64})` }} ></div>
                                    <div className="inner">
                                        <h1 className="name-film">{language === LANGUAGES.VI ? nameVi : nameEn}</h1>
                                        <blockquote>
                                            <h3 className="description">{item.description}</h3>
                                        </blockquote>
                                        <h2 className="title-booking">
                                            <span>
                                                <a onClick={() => this.handleViewInforFilm(item)}>BOOKING NOW</a>
                                            </span>
                                        </h2>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
            </section >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        loadBanner: state.film.allBanner
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadBannerRedux: () => dispatch(actions.fetchBannerFilm())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Banner));
