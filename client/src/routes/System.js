import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserRedux from '../containers/System/Admin/UserRedux';
import FilmRedux from '../containers/System/Admin/FilmRedux';
import PostNowShowing from '../containers/System/Admin/PostNowShowing';
import BannerRedux from '../containers/System/Admin/BannerRedux';
import NewsRedux from '../containers/System/Admin/NewsRedux';
import CinemaTechRedux from '../containers/System/Admin/CinemaTechRedux';
import BuyComboRedux from '../containers/System/Admin/BuyComboRedux';
import PaymentTypesRedux from '../containers/System/Admin/PaymentTypesRedux';
import Header from '../containers/Header/Header';
import BillRedux from '../containers/System/Admin/BillRedux';
import CustomScrollbars from '../components/CustomScrollbars';

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                            <Switch>
                                <Route path="/system/admin-manage" component={UserRedux} />
                                <Route path="/system/film-manage" component={FilmRedux} />
                                <Route path="/system/post-now-showing-manage" component={PostNowShowing} />
                                <Route path="/system/banner-manage" component={BannerRedux} />
                                <Route path="/system/news-manage" component={NewsRedux} />
                                <Route path="/system/cinema-tech-manage" component={CinemaTechRedux} />
                                <Route path="/system/buy-combos" component={BuyComboRedux} />
                                <Route path="/system/bill-manage" component={BillRedux} />
                                <Route path="/system/payment-type" component={PaymentTypesRedux} />
                                <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                            </Switch>
                        </CustomScrollbars>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
