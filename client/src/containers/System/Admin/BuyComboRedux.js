import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, CommonUtils, MONEY } from "../../../utils"
import './BuyComboRedux.scss';
import Lightbox from 'react-image-lightbox';
import ModalBuyCombo from './Modal/ModalBuyCombo';
class BuyComboRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            price: '',
            image: '',
            previewImage: '',
            action: '',
            isOpen: false,
            isOpenModalBuyCombo: false,
            buyComboEditId: '',
            buyComboEdit: {},
        }
    }
    async componentDidMount() {
        this.props.fetchAllPriceRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allPriceRedux !== this.props.allPriceRedux) {
            let arrPrices = this.props.allPriceRedux
            this.setState({
                arrPrices: arrPrices,
                price: arrPrices && arrPrices.length > 0 ? arrPrices[0].keyMap : ''
            })
        }
        if (prevProps.allBuyCombosRedux !== this.props.allBuyCombosRedux) {
            let arrPrices = this.props.allPriceRedux
            this.setState({
                name: '',
                description: '',
                price: arrPrices && arrPrices.length > 0 ? arrPrices[0].keyMap : '',
                image: '',
                action: CRUD_ACTIONS.CREATE,
                previewImage: '',
            })
        }
    }
    handleFetchBuyCombo = () => {
        this.setState({
            isOpenModalBuyCombo: true
        })
    }
    toggleModalBuyCombo = () => {
        this.setState({
            isOpenModalBuyCombo: !this.state.isOpenModalBuyCombo,
        })
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
    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handleOnChange = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid
    }
    handleSaveBuyCombo = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createBuyComboRedux({
                name: this.state.name,
                price: this.state.price,
                image: this.state.image,
                description: this.state.description
            })
            this.setState({
                isOpenModalBuyCombo: true
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editBuyComboRedux({
                id: this.state.buyComboEditId,
                name: this.state.name,
                price: this.state.price,
                image: this.state.image,
                description: this.state.description
            })
            this.setState({
                isOpenModalBuyCombo: true
            })
        }
    }
    handleEditBuyComboFromParent = (buyCombo) => {
        let imageBase64 = '';
        if (buyCombo.image) {
            imageBase64 = new Buffer.from(buyCombo.image, 'base64').toString('binary');
        }
        this.setState({
            name: buyCombo.name,
            description: buyCombo.description,
            price: buyCombo.price,
            image: '',
            previewImage: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            buyComboEditId: buyCombo.id,
            isOpenModalBuyCombo: false,
            buyComboEdit: buyCombo
        })
    }
    render() {
        let listPrice = this.state.arrPrices
        console.log('this.props', listPrice)
        let { language } = this.props
        return (
            <div className="buy-combo-redux-container col-12">
                <div className="title">
                    BOOKING CINE-FILM
                </div>
                <div className="container container-buy-combo col-12">
                    <div className="row">
                        <div className="buy-combo-form col-md-11">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <div className="content-up">
                                        <label>Tên thức ăn/ đồ uống</label>
                                        <input
                                            className="input-name" type='text' placeholder='...'
                                            onChange={(event) => { this.handleOnChange(event, 'name') }}
                                            value={this.state.name}
                                        />
                                    </div>
                                    <div className="content-middle">
                                        <div className="col-md-12 form-group">
                                            <label>Giá</label>
                                            <select className="select-buy-combo"
                                                onChange={(event) => { this.handleOnChange(event, 'price') }}
                                                value={this.state.price}
                                            >
                                                {listPrice && listPrice.length > 0 && listPrice.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>
                                                            {language === LANGUAGES.VI ? item.valueVi + MONEY.DONG : item.valueEn + MONEY.DOLLAR}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="content-down">
                                        <div className="col-md-12 form-group">
                                            <span className="form-label">Chọn ảnh combo</span>
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
                                    </div>
                                </div>
                                <div className="col-md-5 description-buy-combo">
                                    <label>Thông tin combo</label>
                                    <textarea
                                        className="description"
                                        onChange={(event) => this.handleOnChangeDescription(event)}
                                        value={this.state.description}
                                    />
                                </div>
                                <div className="col-md-11">
                                    <div className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-edit-buy-combo" : "btn btn-save-buy-combo"}
                                        onClick={() => this.handleSaveBuyCombo()}
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
                        <div className="list-buy-combo col-md-1">
                            <div className="container-list col-md-1">
                                <ModalBuyCombo
                                    handleEditBuyComboFromParentKey={this.handleEditBuyComboFromParent}
                                    action={this.state.action}
                                    isOpen={this.state.isOpenModalBuyCombo}
                                    toggleFromParent={this.toggleModalBuyCombo}
                                // currentNews={this.state.cinemaTechEdit}
                                // editUser={this.doEditUser}
                                />
                                <button
                                    className="btn-buy-combo px-3"
                                    onClick={() => this.handleFetchBuyCombo()}
                                ><i className="fas fa-box-open"></i>
                                    Danh sách combo
                                </button>
                            </div>
                        </div>
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
        allBuyCombosRedux: state.film.allBuyCombo,
        allPriceRedux: state.film.allPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllBuyComboRedux: () => dispatch(actions.fetchAllBuyCombo()),
        fetchAllPriceRedux: () => dispatch(actions.fetchAllPrice()),
        editBuyComboRedux: (data) => dispatch(actions.editBuyComboAction(data)),
        createBuyComboRedux: (data) => dispatch(actions.createBuyComboAction(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyComboRedux);
