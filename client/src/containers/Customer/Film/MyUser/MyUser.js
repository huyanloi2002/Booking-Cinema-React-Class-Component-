import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './MyUser.scss';
import { LANGUAGES, CommonUtils, MONEY } from '../../../../utils'
import * as actions from '../../../../store/actions'
import Navbar_Infor from '../ChildComponent/Navbar_Infor'
import Lightbox from 'react-image-lightbox';
import { getMyUserByEmail } from '../../../../services/userService'
import { getBookingByEmail } from '../../../../services/filmService'
import * as moment from 'moment'

class MyUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            gender: '',
            image: '',
            address: '',
            isOpen: false,
            previewImage: '',
            Avatar: require("../../../../assets/Avatar.png").default,
            genderArr: [],
            myUser: [],
            historyBooking: [],
            isShowEdit: false
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        let emails = this.props.userInfo.email
        let resInfor = await getMyUserByEmail(emails)
        if (resInfor && resInfor.errCode === 0) {
            let myUser = resInfor.dataMyUser
            this.setState({
                email: myUser.email,
                firstName: myUser.firstName,
                lastName: myUser.lastName,
                phonenumber: myUser.phonenumber,
                gender: myUser.gender,
                image: '',
                address: myUser.address,
                isOpen: false,
                previewImage: myUser.image,
            })
        };
        let resHisory = await getBookingByEmail(emails)
        if (resHisory && resHisory.errCode === 0) {
            this.setState({
                historyBooking: resHisory.dataBookingMyUser ? resHisory.dataBookingMyUser : []
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
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
                image: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImage || !this.state.Avatar) return;
        this.setState({
            isOpen: true
        })

    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleEditMyUser = () => {
        this.props.editMyUserRedux({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
            gender: this.state.gender,
            image: this.state.image,
        })
    }
    handleClickEditMyUser = () => {
        this.setState({
            isShowEdit: !this.state.isShowEdit
        })
    }
    render() {
        let { userInfo, language } = this.props
        let { isOpen, previewImage, Avatar, genderArr, isShowEdit, historyBooking } = this.state
        // let Avatar = require("../../../../assets/Avatar.png").default
        console.log('userInfor.state', historyBooking)
        return (
            <>
                <div className="user-container">
                    <div className="user-content">
                        <div className="all-content-user">
                            <div className="up-content-user">
                                <div className="avatar-user">
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                    <div className="image-user"
                                        style={{ backgroundImage: `url(${previewImage ? previewImage : Avatar})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                        {isShowEdit === true && <label className="label-upload" htmlFor="previewImg">
                                            <i className="fas fa-edit"></i>
                                        </label>}
                                        {this.state.isOpen === true &&
                                            <Lightbox
                                                mainSrc={previewImage ? previewImage : Avatar}
                                                onCloseRequest={() => this.setState({ isOpen: false })}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                            {isShowEdit === false && <div className="name-user-content">
                                <div className="name-user">
                                    <span className="first-name">{this.state.firstName}</span>
                                    <span className="last-name">{this.state.lastName}</span>
                                </div>
                            </div>}
                            <div className="middle-content-user">
                                <div className="btn-edit-user-content">
                                    <button className="btn-edit-my-user"
                                        onClick={() => this.handleClickEditMyUser()}
                                    >
                                        <span>CHỈNH SỬA THÔNG TIN</span>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                </div>
                            </div>
                            {isShowEdit === true && <div className="down-contents-user">
                                <div className="down-content">
                                    <div className="up">
                                        <div className="information">
                                            <div className="right-input">
                                                <div className="lastName">
                                                    <div className="title-input">Last Name:</div>
                                                    <input value={this.state.lastName}
                                                        onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                                    />
                                                </div>
                                                <div className="email">
                                                    <div className="title-input">Email:</div>
                                                    <input value={this.state.email} disabled="disabled" />
                                                </div>
                                                <div className="address">
                                                    <div className="title-input">Address:</div>
                                                    <input value={this.state.address}
                                                        onChange={(event) => { this.onChangeInput(event, 'address') }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="left-input">
                                                <div className="firstName">
                                                    <div className="title-input">First Name:</div>
                                                    <input value={this.state.firstName}
                                                        onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                                    />
                                                </div>
                                                <div className="phonenumber">
                                                    <div className="title-input">Phone Number:</div>
                                                    <input value={this.state.phonenumber} type="tel"
                                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                        onChange={(event) => { this.onChangeInput(event, 'phonenumber') }}
                                                    />
                                                </div>
                                                <div className="gender">
                                                    <div className="title-input">Gender:</div>
                                                    <select className="gender"
                                                        value={this.state.gender}
                                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                                    >
                                                        {genderArr && genderArr.length > 0 && genderArr.map((item, index) => {
                                                            return (
                                                                <option keyMap={index} value={item.keyMap}>
                                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                                </option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="down">
                                        <div className="btn-content">
                                            <button className="btn-save-user"
                                                onClick={() => this.handleEditMyUser()}
                                            >Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className="history-content-user">
                            <div className="history">
                                <div className="title-history">
                                    <span>* LỊCH SỬ ĐẶT VÉ *</span>
                                </div>
                                <div className="fresh-table full-color-orange">
                                    <table id="fresh-table" className="table">
                                        <thead>
                                            <th >Time</th>
                                            <th >Description</th>
                                            <th >Total All</th>
                                            <th >Status</th>
                                        </thead>
                                        <tbody>
                                            {historyBooking && historyBooking.length > 0 && historyBooking.map((item, index) => {
                                                let DayBooking = moment(item.createdAt).format('HH:mm DD/MM/YYYY');
                                                let nameMovie = language === LANGUAGES.VI ? item.filmBooking.nameVi : item.filmBooking.nameEn
                                                let cinemaTech = item.cinemaTech
                                                let dates = moment(item.date).format('DD/MM/YYYY');
                                                let timeTypeBook = language === LANGUAGES.VI ? item.timeTypeBooking.valueVi : item.timeTypeBooking.valueEn
                                                let seatBook = item.seat1
                                                let totalSeat = item.totalSeat
                                                let totalPriceAll = item.totalAll
                                                let payment = item.payment
                                                let status = item.statusId
                                                let combo1 = ""
                                                let combo2 = ""
                                                let combo3 = ""
                                                let coutCombo1 = item.coutCombo1
                                                let coutCombo2 = item.coutCombo2
                                                let coutCombo3 = item.coutCombo3
                                                let totalCombo1 = item.totalCombo1
                                                let totalCombo2 = item.totalCombo2
                                                let totalCombo3 = item.totalCombo3
                                                if (coutCombo1 >= 1) {
                                                    combo1 = item.combo1
                                                    totalCombo1 = item.totalCombo1
                                                    coutCombo1 = item.coutCombo1
                                                } else {
                                                    combo1 = ""
                                                    totalCombo1 = ""
                                                    coutCombo1 = ""
                                                }
                                                if (coutCombo2 >= 1) {
                                                    combo2 = item.combo2
                                                    totalCombo2 = item.totalCombo2
                                                    coutCombo2 = item.coutCombo2
                                                } else {
                                                    combo2 = ""
                                                    totalCombo2 = ""
                                                    coutCombo2 = ""
                                                }
                                                if (coutCombo3 >= 1) {
                                                    combo3 = item.combo3
                                                    totalCombo3 = item.totalCombo3
                                                    coutCombo3 = item.coutCombo3
                                                }
                                                else {
                                                    combo3 = ""
                                                    totalCombo3 = ""
                                                    coutCombo3 = ""
                                                }
                                                return (
                                                    <tr key={index}>
                                                        <td>{DayBooking}</td>
                                                        <td className="description">
                                                            <div className="booking-infor">
                                                                <div className="content-book">
                                                                    <div className="cine"><span className="title-book">Rạp: </span><span >Cine Dalat</span></div>
                                                                    <div className="film"><span className="title-book">Tên phim: </span>  <span > {nameMovie}</span></div>
                                                                    <div className="cinemaTech"><span className="title-book">Công nghệ chiếu: </span><span > {cinemaTech}</span></div>
                                                                    <div className="dayShow"><span className="title-book">Ngày chiếu: </span> <span> {dates}</span></div>
                                                                    <div className="timType"><span className="title-book">Thời gian chiếu: </span><span > {timeTypeBook}</span></div>
                                                                    <div className="seated"><span className="title-book">Ghế đã đặt: </span> <span>  {seatBook} </span></div>
                                                                    <div className="priceSeat"><span className="title-book">Giá ghế: </span><span > {totalSeat + MONEY.DOLLAR} </span></div>
                                                                </div>
                                                            </div>
                                                            <div className="combo-infor">
                                                                <div className="combo-content">
                                                                    <div className="title-combo">
                                                                        <div> <span>ĐA/NU: </span></div>
                                                                        <div> <span>SL: </span></div>
                                                                        <div><span>Giá: </span></div>
                                                                    </div>
                                                                    <div className="combo-total">
                                                                        <div><span className="combo">{combo1}</span><span className="cout">{coutCombo1}</span><span className="total">{totalCombo1}</span></div>
                                                                        <div><span className="combo">{combo2}</span><span className="cout">{coutCombo2}</span><span className="total">{totalCombo2}</span></div>
                                                                        <div><span className="combo">{combo3}</span><span className="cout">{coutCombo3}</span><span className="total">{totalCombo3}</span></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{totalPriceAll + MONEY.DOLLAR}</td>
                                                        <td>
                                                            <div className="status-content">
                                                                <span className="payment">{payment}</span>
                                                                <br /><span className="status">{status}</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        editMyUserRedux: (data) => dispatch(actions.editMyUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyUser);
