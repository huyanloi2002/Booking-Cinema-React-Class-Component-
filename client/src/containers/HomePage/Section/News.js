import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './News.scss'
import "@fontsource/quicksand";
import { FormattedMessage } from 'react-intl';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';
import * as actions from '../../../store/actions';
import * as moment from 'moment'


class News extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrTopNew: []
        }
    }
    componentDidMount() {
        this.props.fetchTopNewsRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.loadTopNews !== this.props.loadTopNews) {
            this.setState({
                arrTopNew: this.props.loadTopNews
            })
        }
    }
    handleViewNews = () => {
        if (this.props.history) {
            this.props.history.push(`/new-movies`)
        }
    }
    handleViewInforNews = (news) => {
        if (this.props.history) {
            this.props.history.push(`/infor-news/${news.id}`)
        }
    }
    render() {
        let arrTopNews = this.state.arrTopNew
        return (
            <section className="section-news">
                <div className="title-news">
                    <span className="title-content">
                        <FormattedMessage id="news.title-news" />
                    </span>
                    <button className="btn-seemore-news" onClick={() => this.handleViewNews()}>
                        <span><FormattedMessage id="news.see-more-news" /></span>
                    </button>
                </div>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
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
                            slidesPerView: 3,
                            spaceBetweenSlides: 30
                        }
                    }}
                    className="mySwiper"
                >{arrTopNews && arrTopNews.length > 0 && arrTopNews.map((item, index) => {
                    let imageBase64 = '';
                    if (item.imageNew) {
                        imageBase64 = new Buffer.from(item.imageNew, 'base64').toString('binary');
                    }
                    let imageBase64s = '';
                    if (item.imageAuthor) {
                        imageBase64s = new Buffer.from(item.imageAuthor, 'base64').toString('binary');
                    }
                    return (
                        <SwiperSlide>
                            <div className="card-news" key={index} onClick={() => this.handleViewInforNews(item)}>
                                <div className="card-image" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                <div className="card-overlay">
                                    <div className="card-header">
                                        <svg className="card-arc" xmlns="http://www.w3.org/2000/svg"><path d="M 40 80 c 22 0 40 -22 40 -40 v 40 Z" /></svg>
                                        <div className="card-thumb" style={{ backgroundImage: `url(${imageBase64s})` }}></div>
                                        <div className="card-header-text">
                                            <div className="card-title">{item.description}</div>
                                            <span className="card-status">{item.nameAuthor}{' | '}{moment(item.createdAt).fromNow()}</span>
                                        </div>
                                    </div>
                                    <div className="card-description" dangerouslySetInnerHTML={{ __html: item.contentHTML }}></div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}


                </Swiper>
            </section>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        loadTopNews: state.film.topNew
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopNewsRedux: () => dispatch(actions.fecthTopNews())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));
