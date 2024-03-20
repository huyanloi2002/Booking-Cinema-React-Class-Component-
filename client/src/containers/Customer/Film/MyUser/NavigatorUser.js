import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adminMenu, staffMenu, manageMyUser } from '../../../Header/menuApp';
import * as actions from "../../../../store/actions";
import NavigatorMyUser from '../../../../components/NavigatorMyUser';
import './NavigatorUser.scss';
import { LANGUAGES, USER_ROLE } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class NavigatorUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuApp: []
        }
    }
    changeLanguage = (language) => {
        // this.props.changeLanguageAppRedux(language)
        // //fire redux event: actions
    }
    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if (role === USER_ROLE.CUSTOMER) {
                menu = manageMyUser
            }
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }
            if (role === USER_ROLE.STAFF) {
                menu = staffMenu
            }
        }
        this.setState({
            menuApp: menu
        })
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="navbar-my-user">
                {/* thanh navigator */}
                <div className="navbar-my-user-content">
                    <NavigatorMyUser menus={this.state.menuApp} />
                </div>
            </div>
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
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigatorUser);
