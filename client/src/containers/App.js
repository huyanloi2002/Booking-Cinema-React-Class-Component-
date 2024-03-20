import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'

import Home from '../routes/Home';
import Login from './Auth/Login';
import Register from './Auth/Register'
import System from '../routes/System';
import InforFilm from './Customer/Film/InforFilm';
import BookingFilm from './Customer/Film/Booking/BookingFilm';
import HomePage from './HomePage/HomePage';
import NowShowingFilm from './Customer/Film/ListFilm/NowShowingFilm';
import ComingSoonFilm from './Customer/Film/ListFilm/ComingSoonFilm';
import NewsMovies from './Customer/Film/ListNew/NewsMovies';
import InforNews from './Customer/Film/InforNews';
import BillToPDF from './Payment/BillToPDF';
import Staff from '../routes/Staff';
import ManageMyUser from '../routes/ManageMyUser';
import { CustomToastCloseButton } from '../components/CustomToast';
import CustomScrollbars from '../components/CustomScrollbars';


class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container" >
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.REGISTER} component={(Register)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={(HomePage)} />
                                    <Route path={path.MYUSERMANAGE} component={userIsAuthenticated(ManageMyUser)} />
                                    <Route path={path.BILLTOPDF} component={userIsAuthenticated(BillToPDF)} />
                                    <Route path={path.INFOR_FILM} component={userIsAuthenticated(InforFilm)} />
                                    <Route path={path.BOOKING_FILM} component={userIsAuthenticated(BookingFilm)} />
                                    <Route path={path.NOW_SHOWING_FILM} component={(NowShowingFilm)} />
                                    <Route path={path.COMING_SOON_FILM} component={(ComingSoonFilm)} />
                                    <Route path={path.NEWS_FILM} component={(NewsMovies)} />
                                    <Route path={path.INFOR_NEWS} component={(InforNews)} />
                                    <Route path={path.STAFF} component={(Staff)} />
                                </Switch>
                            </CustomScrollbars>
                        </div>
                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position="bottom-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);