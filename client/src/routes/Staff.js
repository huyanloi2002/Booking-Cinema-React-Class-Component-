import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageBooking from '../containers/System/Staff/ManageBooking';
import CustomScrollbars from '../components/CustomScrollbars';
import Header from '../containers/Header/Header';
class Staff extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                            <Switch>
                                <Route path="/staff/booking-manage-plan" component={ManageBooking} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Staff);
