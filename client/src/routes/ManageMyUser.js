import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import CustomScrollbars from '../components/CustomScrollbars';
import NavigatorUser from '../containers/Customer/Film/MyUser/NavigatorUser';
import Header from '../containers/Header/Header';
import MyUser from '../containers/Customer/Film/MyUser/MyUser';
class ManageMyUser extends Component {
    render() {
        const { userMenuPath, isLoggedIn } = this.props
        return (
            <React.Fragment>
                <div className="my-manage-user-main">
                    {isLoggedIn && <NavigatorUser />}
                    <div className="myuser-container">
                        <div className="myuser-list">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path="/manage-my-user/my-user" component={MyUser} />
                                    <Route component={() => { return (<Redirect to={userMenuPath} />) }} />
                                </Switch>
                            </CustomScrollbars>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userMenuPath: state.app.userMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMyUser);
