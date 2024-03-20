import { right } from '@popperjs/core';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from "../../../utils"
import './BannerRedux.scss';
import Select from 'react-select';
import { getBannerFilm } from '../../../services/filmService';
import Lightbox from 'react-image-lightbox';

class BannerRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasOldData: false,
            listAllFilm: [],
            description: '',
            imagebanner: '',
            isOpen: false,
            previewImage: ''

        }
    }
    componentDidMount() {
        this.props.fetchAllFilmsRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allFilms !== this.props.allFilms) {
            let dataSelectFilm = this.buildDataInputSelect(this.props.allFilms)
            this.setState({
                listAllFilm: dataSelectFilm,
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.nameVi}`
                let labelEn = `${item.nameEn}`
                // let labels = `${item.nameVi}`
                object.label = language == LANGUAGES.VI ? labelVi : labelEn;
                // object.label = labels;
                object.value = item.id;
                result.push(object)
            })

        }
        return result;
    }

    handleSaveBanner = () => {
        let { hasOldData } = this.state;
        this.props.saveBannerRedux({
            imagebanner: this.state.imagebanner,
            description: this.state.description,
            filmId: this.state.selectedFilm.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }
    handleChangeSelectFilm = async (selectedFilm) => {
        this.setState({ selectedFilm });
        let res = await getBannerFilm(selectedFilm.value);
        let imageBase64 = '';
        if (res.data.imagebanner) {
            imageBase64 = new Buffer.from(res.data.imagebanner, 'base64').toString('binary');
        }
        if (res && res.errCode === 0 && res.data) {
            let banners = res.data;
            this.setState({
                description: banners.description,
                previewImage: imageBase64,
                hasOldData: true
            })
        }
        else {
            this.setState({
                previewImage: '',
                description: '',
                hasOldData: false
            })
        }
    };

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImage: objectUrl,
                imagebanner: base64
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
    render() {
        let { hasOldData } = this.state;
        let language = this.props.language

        return (
            <div className="banner-redux-container">
                <div className="title">
                    BOOKING CINE-FILM
                </div>
                <div className="banner-redux-body banner-form my-2" >
                    <div className="container col-md-12">
                        <div className="row">
                            <div className="container-banner col-md-12">
                                <div className="row">
                                    <div className="banner col-md-12">
                                        <div className="row">
                                            <div className="content-left">
                                                <label className="title-name">Chọn phim:</label>
                                                <Select
                                                    value={this.state.selectedFilm}
                                                    onChange={this.handleChangeSelectFilm}
                                                    options={this.state.listAllFilm}
                                                    className="form-controls select-content"

                                                />
                                                <label className="title-name">Thông tin giới thiệu:</label>
                                                <textarea className="form-control" rows="12"
                                                    onChange={(event) => this.handleOnChangeDescription(event)}
                                                    value={this.state.description}
                                                ></textarea>
                                            </div>
                                            <div className="form-group">
                                                <span className="form-label"><FormattedMessage id="film-manage.avatar" /></span>
                                                <div className="preview-img-container">
                                                    <input id="previewImg" type="file" hidden
                                                        onChange={(event) => this.handleOnChangeImage(event)}
                                                    />
                                                    <label className="label-upload" htmlFor="previewImg"><FormattedMessage id="film-manage.uploadimage" /><i className="fas fa-upload"></i></label>
                                                    <div className="preview-img banner-image"
                                                        style={{ backgroundImage: `url(${this.state.previewImage})` }}
                                                        onClick={() => this.openPreviewImage()}
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-btn col-md-4">
                                        <button className=
                                            {hasOldData === true ? "edit-btn" : "create-btn"}
                                            onClick={() => this.handleSaveBanner()}
                                        ><div className="title-save">
                                                {hasOldData === true ?
                                                    <FormattedMessage id="post-film.edit-infor-film" />
                                                    :
                                                    <FormattedMessage id="post-film.create-infor-film" />
                                                }
                                            </div>
                                        </button>
                                    </div>
                                </div>
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
        allFilms: state.film.allFilms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllFilmsRedux: () => dispatch(actions.fetchAllFilms()),
        saveBannerRedux: (data) => dispatch(actions.saveBannerFilms(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerRedux);
