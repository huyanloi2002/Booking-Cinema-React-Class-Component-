import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import "@fontsource/quicksand";
import logo from '../../assets/logo.ico'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions';
import 'flag-icon-css/css/flag-icons.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from 'react-router';
import "../../../node_modules/keen-slider/keen-slider.min.css"



class HomeHeader extends Component {
    //THAY DOI NGON NGU
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux event: actions
    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img className="header-logo" src={logo} onClick={() => this.returnToHome()} />
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.cinema" /></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.choose-cinemas-across-the-country" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.genre" /></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.find-movies-by-genre" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.film" /></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.choose-the-movie-as-you-want" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.promotion" /></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.for-couples-or-vouchers" /></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="far fa-question-circle"></i>
                                <FormattedMessage id="home-header.support" />
                            </div>
                            <div className="dropdown">
                                <button className="btn btn-black dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fas fa-globe"></i>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><a onClick={() => this.changeLanguage(LANGUAGES.VI)}><span className="flag-icon flag-icon-vn mx-2"></span></a></li>
                                    <li className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><a onClick={() => this.changeLanguage(LANGUAGES.EN)}><span className="flag-icon flag-icon-gb mx-2"></span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div >
                {/* {this.props.isShowBanner === true &&
                    <Slider />

                } */}
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
