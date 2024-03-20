import { right } from '@popperjs/core';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss';
import * as actions from '../../../store/actions'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            previewImage: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            role: '',
            avatar: '',
            action: '',
            userEditId: '',
            previewImage: ''

        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux
            let arrRoles = this.props.roleRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImage: ''


            })
        }
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImage: objectUrl,
                avatar: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImage) return;
        this.setState({
            isOpen: true
        })

    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;
        let { action } = this.state;
        //fire redux action
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                avatar: this.state.avatar,
            })
        }
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phonenumber,
            gender: user.gender,
            role: user.roleId,
            avatar: '',
            previewImage: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }
    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isLoadGender = this.props.isLoadingGender
        let { email, password, firstName, lastName, address, phoneNumber, gender, role, avatar } = this.state
        return (
            <React.Fragment>
                <div className="user-redux-container">
                    <div className="title">
                        BOOKING CINE-FILM
                    </div>
                    <div className="user-redux-body" >
                        <div className="container">
                            <div className="row">
                                <div className="booking-form">
                                    <form>
                                        <div className="title-content col-12">
                                            {this.state.action === CRUD_ACTIONS.EDIT ?
                                                <FormattedMessage id="user-manage.edit-user" />
                                                :
                                                <FormattedMessage id="user-manage.add-user" />
                                            }</div>
                                        <div className="col-12">{isLoadGender === true ? 'Loading gender' : ''}</div>
                                        <div className="form-group">
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <span className="form-label"><FormattedMessage id="user-manage.email" /></span>
                                                    <input className="form-control" type="email" placeholder="Email"
                                                        value={email}
                                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <span className="form-label"><FormattedMessage id="user-manage.password" /></span>
                                                    <input className="form-control" type="password" placeholder="Password"
                                                        value={password}
                                                        onChange={(event) => { this.onChangeInput(event, 'password') }}
                                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <span className="form-label"><FormattedMessage id="user-manage.lastname" /></span>
                                                    <input className="form-control" type="text" placeholder="Last name"
                                                        value={lastName}
                                                        onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <span className="form-label"><FormattedMessage id="user-manage.firstname" /></span>
                                                    <input className="form-control" type="text" placeholder="First name"
                                                        value={firstName}
                                                        onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <span className="form-label"><FormattedMessage id="user-manage.address" /></span>
                                                    <input className="form-control" type="text" placeholder="Address"
                                                        value={address}
                                                        onChange={(event) => { this.onChangeInput(event, 'address') }} />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <span className="form-label"><FormattedMessage id="user-manage.gender" /></span>
                                                    <select className="form-control"
                                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                                        value={gender}
                                                    >
                                                        {genders && genders.length > 0 &&
                                                            genders.map((item, index) => {
                                                                return (
                                                                    <option keyMap={index} value={item.keyMap}>
                                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <span className="select-arrow"></span>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <span className="form-label"><FormattedMessage id="user-manage.role" /></span>
                                                    <select className="form-control"
                                                        onChange={(event) => { this.onChangeInput(event, 'role') }}
                                                        value={role}
                                                    >
                                                        {roles && roles.length > 0 &&
                                                            roles.map((item, index) => {
                                                                return (
                                                                    <option keyMap={index} value={item.keyMap}>
                                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <span className="select-arrow"></span>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <span className="form-label"><FormattedMessage id="user-manage.phonenumber" /></span>
                                                    <input className="form-control" type="text" placeholder="Phone number"
                                                        value={phoneNumber}
                                                        onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <span className="form-label"><FormattedMessage id="user-manage.avatar" /></span>
                                                    <div className="preview-img-container">
                                                        <input id="previewImg" type="file" hidden
                                                            onChange={(event) => this.handleOnChangeImage(event)}
                                                        />
                                                        <label className="label-upload" htmlFor="previewImg"><FormattedMessage id="user-manage.uploadimage" /><i className="fas fa-upload"></i></label>
                                                        <div className="preview-img"
                                                            style={{ backgroundImage: `url(${this.state.previewImage})` }}
                                                            onClick={() => this.openPreviewImage()}
                                                        >

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-btn">
                                                    <div className={this.state.action === CRUD_ACTIONS.EDIT ? "btn-edit" : "btn-save"}
                                                        onClick={() => this.handleSaveUser()}
                                                    ><div className="title-save">
                                                            {this.state.action === CRUD_ACTIONS.EDIT ?
                                                                <FormattedMessage id="user-manage.edit" />
                                                                :
                                                                <FormattedMessage id="user-manage.save" />
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 my-2">
                        <TableManageUser
                            handleEditUserFromParentKey={this.handleEditUserFromParent}
                            action={this.state.action}
                        />
                    </div>
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImage}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
            </React.Fragment>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUsersRedux: () => dispatch(actions.fectchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
