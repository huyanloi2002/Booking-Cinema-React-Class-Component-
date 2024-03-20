import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Register.scss';
import { FormattedMessage } from 'react-intl';
import { checkEmail } from '../../services/userService';
import { LANGUAGES } from '../../utils';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm_password: '',
            address: '',
            phoneNumber: '',
            gender: '',
            firstName: '',
            lastName: '',
            roleId: 'R3',
            isShowPassword: false,
            errMessage: '',
            errUsername: '',
            errPassword: '',
            errConfirm_password: '',
            errAddress: '',
            errPhoneNumber: '',
            errGender: '',
            errFirstName: '',
            errLastName: '',
            genreArr: [],
            emailCheck: '',
            errCheck: '',
            registerSuccess: '',
        }
    }
    componentDidMount() {
        this.props.getGenderRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux
            this.setState({
                genreArr: arrGender,
            })
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
            errCheck: '',
            registerSuccess: ''
        })
        if (copyState['username']) {
            this.setState({
                errCheck: ''
            })
        }
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }
    handleRegisterUser = async () => {
        let { username, password, confirm_password, address, phoneNumber,
            gender, firstName, lastName, roleId, errMessage
        } = this.state
        let res = await checkEmail(this.state.username)
        if (res === true) {
            this.setState({
                errCheck: 'Your is Email is not existin your system. Please try other email'
            })
        }
        else if (!username) {
            this.setState({
                errUsername: 'Fail username !'
            })
        }
        else if (!password) {
            this.setState({
                errPassword: 'Fail password !'
            })
        }
        else if (!confirm_password) {
            this.setState({
                errConfirm_password: 'Fail confirm password !'
            })
        }
        else if (!lastName) {
            this.setState({
                errLastName: 'Fail Last Name !'
            })
        }
        else if (!firstName) {
            this.setState({
                errFirstName: 'Fail First Name !'
            })
        }
        else if (!phoneNumber) {
            this.setState({
                errPhoneNumber: 'Fail phone number !'
            })
        }
        else if (!gender) {
            this.setState({
                errGender: 'Fail gender !'
            })
        }
        else if (!address) {
            this.setState({
                errAddress: 'Fail address !'
            })
        }
        else if (password !== confirm_password) {
            this.setState({
                errMessage: 'Confirm password not same password!'
            })
        }
        else {
            this.props.registerRedux({
                email: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                address: address,
                phonenumber: phoneNumber,
                gender: gender,
                roleId: roleId
            })
            this.setState({
                registerSuccess: 'Create success !'
            })
        }
    }
    goToLogin = () => {
        if (this.props.history) {
            this.props.history.push(`/login`)
        }
    }
    render() {
        //JSX
        let { username, password, confirm_password, address, phoneNumber,
            gender, firstName, lastName, roleId, errMessage, genreArr, errCheck
        } = this.state
        let { language } = this.props
        console.log('e', errCheck)

        return (
            <div className="register-background">
                <div className="register-container">
                    <div className="register-content row">
                        <div className="col-12 text-register">Register</div>
                        <div className="col-12 form-group register-input">
                            <label>Username:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(event) => this.onChangeInput(event, 'username')}
                                onKeyDown={(event) => { this.handleKeyDown(event) }}
                            />
                            <div
                                className='col-12'
                                style={{ color: 'red' }}>
                                {this.state.errCheck}
                            </div>
                            {!username ? <div
                                className='col-12'
                                style={{ color: 'red' }}>
                                {this.state.errUsername}
                            </div> : ""}
                        </div>

                        <div className="col-12 form-group register-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input
                                    className="form-control"
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    value={password}
                                    placeholder="Enter your password"
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                    onKeyDown={(event) => { this.handleKeyDown(event) }}
                                />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                            {!password ? <div
                                className='col-12'
                                style={{ color: 'red' }}>
                                {this.state.errPassword}
                            </div> : ""}
                        </div>

                        <div className="col-12 form-group register-input">
                            <label>Confirm Password:</label>
                            <div className="custom-input-password">
                                <input
                                    className="form-control"
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    value={confirm_password}
                                    placeholder="Enter your password"
                                    onChange={(event) => this.onChangeInput(event, 'confirm_password')}
                                    onKeyDown={(event) => { this.handleKeyDown(event) }}
                                />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                            {!confirm_password ? <div
                                className='col-12'
                                style={{ color: 'red' }}>
                                {this.state.errConfirm_password}
                            </div> : ""}
                            {password !== confirm_password ? <div
                                className='col-12'
                                style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div> : ""}
                        </div>

                        <div className="col-6 form-group register-input">
                            <label>Last Name:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(event) => this.onChangeInput(event, 'lastName')}
                                onKeyDown={(event) => { this.handleKeyDown(event) }}
                            />
                            {!lastName ? <div
                                className='col-12'
                                style={{ color: 'red' }}>
                                {this.state.errLastName}
                            </div> : ""}
                        </div>

                        <div className="col-6 form-group register-input">
                            <label>First Name:</label>
                            <input type="text"
                                className="form-control"
                                value={firstName}
                                placeholder="Enter your first name"
                                onChange={(event) => this.onChangeInput(event, 'firstName')}
                                onKeyDown={(event) => { this.handleKeyDown(event) }}
                            />
                            {!firstName ? <div
                                className='col-12'
                                style={{ color: 'red' }}>
                                {this.state.errFirstName}
                            </div> : ""}
                        </div>

                        <div className="col-6 form-group register-input">
                            <label>Phone Number:</label>
                            <input type="text"
                                className="form-control"
                                value={phoneNumber}
                                placeholder="Enter your phonenumber"
                                onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                onKeyDown={(event) => { this.handleKeyDown(event) }}
                            />
                            {!phoneNumber ? <div
                                className='col-12'
                                style={{ color: 'red' }}>
                                {this.state.errPhoneNumber}
                            </div> : ""}
                        </div>

                        <div className="col-6 form-group register-input">
                            <label>Gender:</label>
                            <select className="form-control"
                                value={gender}
                                onChange={(event) => { this.onChangeInput(event, 'gender') }}
                            >
                                {genreArr && genreArr.length > 0 && genreArr.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })}

                            </select>
                            {!gender ? <div
                                className='col-12'
                                style={{ color: 'red' }}>
                                {this.state.errGender}
                            </div> : ""}
                        </div>

                        <div className="col-12 form-group register-input">
                            <label>Address:</label>
                            <input type="text"
                                className="form-control"
                                value={address}
                                placeholder="Enter your address"
                                onChange={(event) => this.onChangeInput(event, 'address')}
                                onKeyDown={(event) => { this.handleKeyDown(event) }}
                            />
                            {!address ? <div
                                className='col-12'
                                style={{ color: 'red' }}>
                                {this.state.address}
                            </div> : ""}
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn-register"
                                onClick={() => { this.handleRegisterUser() }}
                            >Register</button>
                        </div>
                        <div
                            className='col-12'
                            style={{ color: 'green', textAlign: 'center' }}>
                            {this.state.registerSuccess}
                        </div>
                        <span style={{ color: 'green', textAlign: 'center', fontWeight: '600', borderTop: '1px solid gray' }}>Go to: </span>
                        <div className="col-12">
                            <button type="submit" className="btn-login"
                                onClick={() => { this.goToLogin() }}
                            >Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        registerRedux: (data) => dispatch(actions.registerAction(data)),
        getGenderRedux: () => dispatch(actions.fetchGenderStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
