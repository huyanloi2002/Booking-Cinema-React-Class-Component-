import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from "../../../utils"
import './PaymentTypesRedux.scss';
import Lightbox from 'react-image-lightbox';
import ModalCinemaTech from './Modal/ModalCinemaTech';



class PaymentTypesRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueVi: '',
            valueEn: '',
            keyMap: '',
            image: '',
            previewImage: '',
            isOpen: false,
        }
    }
    componentDidMount() {
        this.props.fetchPaymentTypeRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allPaymentTypeRedux !== this.props.allPaymentTypeRedux) {
            this.setState({
                valueVi: '',
                valueEn: '',
                keyMap: '',
                image: '',
                previewImage: '',
                action: CRUD_ACTIONS.CREATE
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
        if (!this.state.previewImage) return;
        this.setState({
            isOpen: true
        })

    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['valueVi', 'valueEn']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid
    }
    handleSaveCinemaTech = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;
        let { action } = this.state;
        console.log('action', action)
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createPaymentTypeRedux({
                valueVi: this.state.valueVi,
                valueEn: this.state.valueEn,
                keyMap: this.state.keyMap,
                image: this.state.image,
            })

        }
    }
    render() {
        return (
            <div className="payment-type-redux-container col-12">
                <div className="title">
                    BOOKING CINE-FILM
                </div>
                <div className="container container-payment-type col-12">
                    <div className="row">
                        <div className="payment-type-form col-md-11">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <div className="content-up">
                                        <label>Tên hình thức thanh toán (VI)</label>
                                        <input
                                            className="input-name" type='text' placeholder='...'
                                            onChange={(event) => { this.handleOnChangeInput(event, 'valueVi') }}
                                            value={this.state.valueVi}
                                        />
                                    </div>
                                    <div className="content-up">
                                        <label>Tên hình thức thanh toán (EN)</label>
                                        <input
                                            className="input-name" type='text' placeholder='...'
                                            onChange={(event) => { this.handleOnChangeInput(event, 'valueEn') }}
                                            value={this.state.valueEn}
                                        />
                                    </div>
                                    <div className="content-up">
                                        <label>Mã</label>
                                        <input
                                            className="input-name" type='text' placeholder='...'
                                            onChange={(event) => { this.handleOnChangeInput(event, 'keyMap') }}
                                            value={this.state.keyMap}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-5 form-group">
                                    <span className="form-label">Chọn ảnh</span>
                                    <div className="preview-img-container">
                                        <input id="previewImg" type="file" hidden
                                            onChange={(event) => this.handleOnChangeImage(event)}
                                        />
                                        <label className="label-upload" htmlFor="previewImg"><FormattedMessage id="film-manage.uploadimage" /><i className="fas fa-upload"></i></label>
                                        <div className="preview-img"
                                            style={{ backgroundImage: `url(${this.state.previewImage})` }}
                                            onClick={() => this.openPreviewImage()}
                                        >
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <div className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-edit-payment-type" : "btn btn-save-payment-type"}
                                        onClick={() => this.handleSaveCinemaTech()}
                                    ><div className="title-save">
                                            {this.state.action === CRUD_ACTIONS.EDIT ?
                                                <FormattedMessage id="film-manage.edit" />
                                                :
                                                <FormattedMessage id="film-manage.save" />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="list-payment-type col-md-1">
                            <div className="container-list col-md-1">
                                <ModalCinemaTech
                                    handleEditCinemaTechFromParentKey={this.handleEditCinemaTechFromParent}
                                    action={this.state.action}
                                    isOpen={this.state.isOpenModalCinemaTech}
                                    toggleFromParent={this.toggleCinemaModalTech}
                                // currentNews={this.state.cinemaTechEdit}
                                // editUser={this.doEditUser}
                                />
                                <button
                                    className="btn-payment-type px-3"
                                    onClick={() => this.handleFetchCinemaTech()}
                                ><i className="fas fa-box-open"></i>
                                    Danh sách công nghệ
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImage}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allPaymentTypeRedux: state.film.allPaymentType,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPaymentTypeRedux: () => dispatch(actions.fetchAllPaymentType()),
        createPaymentTypeRedux: (data) => dispatch(actions.createPaymentTypeAction(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTypesRedux);
