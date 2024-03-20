import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from "../../../utils"
import './CinemaTechRedux.scss';
import Lightbox from 'react-image-lightbox';
import ModalCinemaTech from './Modal/ModalCinemaTech';



class CinemaTechRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            image: '',
            previewImage: '',
            isOpen: false,
            isOpenModalCinemaTech: false,
            cinemaTechEditId: '',
            cinemaTechEdit: {},
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allCinemaTechsRedux !== this.props.allCinemaTechsRedux) {
            this.setState({
                name: '',
                description: '',
                image: '',
                previewImage: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }
    handleFetchCinemaTech = () => {
        this.setState({
            isOpenModalCinemaTech: true
        })
    }
    toggleCinemaModalTech = () => {
        this.setState({
            isOpenModalCinemaTech: !this.state.isOpenModalCinemaTech,
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
    handleOnChangeInput = (event, id) => {
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
    handleSaveCinemaTech = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;
        let { action } = this.state;
        console.log('action', action)
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createCinemaTechRedux({
                name: this.state.name,
                description: this.state.description,
                image: this.state.image,
            })
            this.setState({
                isOpenModalCinemaTech: true
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editCinemaTechRedux({
                id: this.state.cinemaTechEditId,
                name: this.state.name,
                description: this.state.description,
                image: this.state.image,
            })
            this.setState({
                isOpenModalCinemaTech: true
            })
        }
    }
    handleEditCinemaTechFromParent = (cinemaTech) => {
        let imageBase64 = '';
        if (cinemaTech.image) {
            imageBase64 = new Buffer.from(cinemaTech.image, 'base64').toString('binary');
        }
        this.setState({
            name: cinemaTech.name,
            description: cinemaTech.description,
            image: '',
            previewImage: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            cinemaTechEditId: cinemaTech.id,
            isOpenModalCinemaTech: false,
            cinemaTechEdit: cinemaTech
        })
    }
    render() {
        return (
            <div className="cinema-tech-redux-container col-12">
                <div className="title">
                    BOOKING CINE-FILM
                </div>
                <div className="container container-cinema-tech col-12">
                    <div className="row">
                        <div className="cinema-tech-form col-md-11">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <div className="content-up">
                                        <label>Công nghệ chiếu</label>
                                        <input
                                            className="input-name" type='text' placeholder='...'
                                            onChange={(event) => { this.handleOnChangeInput(event, 'name') }}
                                            value={this.state.name}
                                        />
                                    </div>
                                    <div className="content-down">
                                        <div className="col-md-12 form-group">
                                            <span className="form-label">Chọn ảnh công nghệ chiếu</span>
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
                                <div className="col-md-5 description-cinema-tech">
                                    <label>Thông tin công nghệ</label>
                                    <textarea
                                        className="description"
                                        onChange={(event) => this.handleOnChangeDescription(event)}
                                        value={this.state.description}
                                    />
                                </div>
                                <div className="col-md-11">
                                    <div className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-edit-cinema-tech" : "btn btn-save-cinema-tech"}
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
                        <div className="list-cinema-tech col-md-1">
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
                                    className="btn-cinema-tech px-3"
                                    onClick={() => this.handleFetchCinemaTech()}
                                ><i className="fas fa-box-open"></i>
                                    Danh sách công nghệ
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
        allCinemaTechsRedux: state.film.allCinemaTechs,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCinemaTechsRedux: () => dispatch(actions.fetchAllCinemaTech()),
        editCinemaTechRedux: (data) => dispatch(actions.editCinemaTechAction(data)),
        createCinemaTechRedux: (data) => dispatch(actions.createCinemaTechAction(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CinemaTechRedux);
