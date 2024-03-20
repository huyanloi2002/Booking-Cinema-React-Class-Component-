import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Navbar from '../../HomePage/Navbar/Navbar';
import './InforFilm.scss';
import { getInforFilm } from '../../../services/filmService';
import { LANGUAGES } from '../../../utils'
import BookingTime from './Booking/BookingTime';
import * as actions from '../../../store/actions'
import Navbar_Infor from '../../../containers/Customer/Film/ChildComponent/Navbar_Infor'

class InforFilm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inforDetailFilm: {},
            currentFilmId: -1,
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentFilmId: id
            })
            let res = await getInforFilm(id)
            if (res && res.errCode === 0) {
                this.setState({
                    inforDetailFilm: res.data,
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { inforDetailFilm } = this.state;
        let languages = this.props.language;
        console.log('inforDetailFilm', inforDetailFilm)
        return (
            <React.Fragment>
                <Navbar_Infor />
                <div className="switch-pages ">
                    <div className="switch-pages-content">
                        <div className="title-news">
                            <span>Nội dung phim</span>
                        </div>
                    </div>
                </div>
                <div className="content-infor">
                    <div className="infor-film-container">
                        <div className="intro-film">
                            <div className="content-left"
                                style={{ backgroundImage: `url(${inforDetailFilm.image ? inforDetailFilm.image : ''})` }}
                            >
                            </div>
                            <div className="content-right">
                                <div className="up">
                                    <div className="title-film">{languages === LANGUAGES.VI ? inforDetailFilm.nameVi : inforDetailFilm.nameEn}</div>
                                </div>
                                <div className="down">
                                    <div className="direction">
                                        <span className="titles"><FormattedMessage id="film-manage.direction" /></span>
                                        <span>{inforDetailFilm.director ? inforDetailFilm.director : ''}</span>
                                    </div>
                                    <div className="actor">
                                        <span className="titles"><FormattedMessage id="film-manage.actor" /></span>
                                        <span>{inforDetailFilm.actor ? inforDetailFilm.actor : ''}</span>
                                    </div>
                                    <div className="genre">
                                        <span className="titles"><FormattedMessage id="film-manage.genre" /></span>
                                        {inforDetailFilm
                                            && inforDetailFilm.genreData
                                            && inforDetailFilm.genreData.valueVi
                                            && inforDetailFilm.genreData.valueEn
                                            &&
                                            <span>{languages === LANGUAGES.VI ? inforDetailFilm.genreData.valueVi : inforDetailFilm.genreData.valueEn}</span>
                                        }
                                    </div>
                                    <div className="dayShow">
                                        <span className="titles"><FormattedMessage id="film-manage.dayShow" /></span>
                                        <span>{inforDetailFilm.dayShow ? inforDetailFilm.dayShow : ''}</span>
                                    </div>
                                    <div className="duration">
                                        <span className="titles"><FormattedMessage id="film-manage.duration" /></span>
                                        <span>{inforDetailFilm.duration ? inforDetailFilm.duration : ''}</span>
                                    </div>
                                    <div className="language">
                                        <span className="titles"><FormattedMessage id="film-manage.language" /></span>
                                        <span>{inforDetailFilm.language ? inforDetailFilm.language : ''}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="booking-time">
                            <div className="content-left">
                                < BookingTime
                                    filmIdFromParent={this.state.currentFilmId}
                                    inforDetail={this.state.inforDetailFilm}
                                />
                            </div>
                            <div className="content-right">
                                {inforDetailFilm
                                    && inforDetailFilm.Markdown
                                    && inforDetailFilm.Markdown.description
                                    &&
                                    <iframe
                                        width="100%" height="250" src={inforDetailFilm.Markdown.description} >
                                    </iframe>
                                }
                            </div>
                        </div>
                        <div className="detail-infor-film">
                            <div className="down-left">
                                <div className="summary"><FormattedMessage id="infor-film.infor.summary" style={{ fontWeight: '100' }} />:</div>
                                {inforDetailFilm
                                    && inforDetailFilm.Markdown
                                    && inforDetailFilm.Markdown.contentHTML
                                    &&
                                    <div dangerouslySetInnerHTML={{ __html: inforDetailFilm.Markdown.contentHTML }}>
                                    </div>
                                }
                            </div>
                            <div className="down-right">
                            </div>
                        </div>
                        <div className="comment-doctor">

                        </div>
                    </div>
                </div >
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(InforFilm);
