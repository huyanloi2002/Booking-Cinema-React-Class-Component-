import { right } from '@popperjs/core';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './FilmRedux.scss';
import * as actions from '../../../store/actions'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ModalFilm from './Modal/ModalFilm';

class FilmRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            nameVi: '',
            nameEn: '',
            genre: '',
            show: '',
            avatar: '',
            director: '',
            actor: '',
            dayShow: '',
            duration: '',
            language: '',
            action: '',
            filmEditId: '',
            previewImage: '',
            isOpenModalFilm: false,
            filmEdit: {}
        }
    }

    async componentDidMount() {
        this.props.getGenreStart();
        this.props.getShowStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genreRedux !== this.props.genreRedux) {
            let arrGenres = this.props.genreRedux
            this.setState({
                genreArr: arrGenres,
                genre: arrGenres && arrGenres.length > 0 ? arrGenres[0].keyMap : ''
            })
        }
        if (prevProps.showRedux !== this.props.showRedux) {
            let arrShows = this.props.showRedux
            this.setState({
                showArr: arrShows,
                show: arrShows && arrShows.length > 0 ? arrShows[0].keyMap : ''
            })
        }
        if (prevProps.allFilmsRedux !== this.props.allFilmsRedux) {
            let arrGenres = this.props.genreRedux
            let arrShows = this.props.showRedux
            this.setState({
                nameVi: '',
                nameEn: '',
                director: '',
                actor: '',
                dayShow: '',
                duration: '',
                language: '',
                genre: arrGenres && arrGenres.length > 0 ? arrGenres[0].keyMap : '',
                show: arrShows && arrShows.length > 0 ? arrShows[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImage: ''
            })
        }
    }
    handleFetchFilm = () => {
        this.setState({
            isOpenModalFilm: true
        })
    }
    toggleFilmModal = () => {
        this.setState({
            isOpenModalFilm: !this.state.isOpenModalFilm,
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
    handleSaveFilm = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;
        let { action } = this.state;
        //fire redux action
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewFilmRedux({
                nameVi: this.state.nameVi,
                nameEn: this.state.nameEn,
                genreId: this.state.genre,
                showId: this.state.show,
                avatar: this.state.avatar,
                director: this.state.director,
                actor: this.state.actor,
                dayShow: this.state.dayShow,
                duration: this.state.duration,
                language: this.state.language,
            })
            this.setState({
                isOpenModalFilm: true
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editAFilmRedux({
                id: this.state.filmEditId,
                nameVi: this.state.nameVi,
                nameEn: this.state.nameEn,
                genreId: this.state.genre,
                showId: this.state.show,
                avatar: this.state.avatar,
                director: this.state.director,
                actor: this.state.actor,
                dayShow: this.state.dayShow,
                duration: this.state.duration,
                language: this.state.language,
            })
            this.setState({
                isOpenModalFilm: true
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
        let arrCheck = ['nameVi', 'nameEn']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    handleEditFilmFromParent = (film) => {
        let imageBase64 = '';
        if (film.image) {
            imageBase64 = new Buffer(film.image, 'base64').toString('binary');
        }
        this.setState({
            nameVi: film.nameVi,
            nameEn: film.nameEn,
            genre: film.genreId,
            show: film.showId,
            director: film.director,
            actor: film.actor,
            dayShow: film.dayShow,
            duration: film.duration,
            language: film.language,
            avatar: '',
            previewImage: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            filmEditId: film.id,
            isOpenModalFilm: false,
            filmEdit: film
        })
    }
    render() {
        let genres = this.state.genreArr;
        let shows = this.state.showArr;
        let languages = this.props.language;
        let isLoadGenre = this.props.isLoadingGenre
        let { nameVi, nameEn, genre, show, avatar, director, actor, dayShow, duration, language } = this.state
        console.log('this.props', this.state)

        return (
            <React.Fragment>
                <div className="film-redux-container">
                    <div className="title">
                        BOOKING CINE-FILM
                    </div>
                    <div className="film-redux-body" >
                        <div className="container col-12">
                            <div className="row">
                                <div className="booking-form col-md-11">
                                    <form>
                                        <div className="title-content col">
                                            {this.state.action === CRUD_ACTIONS.EDIT ?
                                                <FormattedMessage id="film-manage.edit-film" />
                                                :
                                                <FormattedMessage id="film-manage.add-film" />
                                            }
                                            <div className="col-12">{isLoadGenre === true ? 'Loading genre' : ''}</div>
                                        </div>
                                        <div className="form-group">
                                        </div>
                                        <div className="form-group">
                                            <span className="form-label"><FormattedMessage id="film-manage.nameVi" /></span>
                                            <input className="form-control" type="text" placeholder="..."
                                                value={nameVi}
                                                onChange={(event) => { this.onChangeInput(event, 'nameVi') }}

                                            />
                                        </div>
                                        <div className="form-group">
                                            <span className="form-label"><FormattedMessage id="film-manage.nameEn" /></span>
                                            <input className="form-control" type="text" placeholder="..."
                                                value={nameEn}
                                                onChange={(event) => { this.onChangeInput(event, 'nameEn') }}
                                            />
                                        </div>
                                        <div className="form-group-infor col-md-12">
                                            <div className="row">
                                                <div className="direction col-md-6">
                                                    <span className="form-label"><FormattedMessage id="film-manage.direction" /></span>
                                                    <input className="form-control" type="text" placeholder="..."
                                                        value={director}
                                                        onChange={(event) => { this.onChangeInput(event, 'director') }}

                                                    />
                                                </div>
                                                <div className="actor col-md-6">
                                                    <span className="form-label"><FormattedMessage id="film-manage.actor" /></span>
                                                    <input className="form-control" type="text" placeholder="..."
                                                        value={actor}
                                                        onChange={(event) => { this.onChangeInput(event, 'actor') }}

                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="form-group-infor col-md-12">
                                            <div className="row">
                                                <div className="dayShow col-md-3">
                                                    <span className="form-label"><FormattedMessage id="film-manage.dayShow" /></span>
                                                    <input className="form-control" type="text" placeholder="..."
                                                        value={dayShow}
                                                        onChange={(event) => { this.onChangeInput(event, 'dayShow') }}

                                                    />
                                                </div>
                                                <div className="duration col-md-4">
                                                    <span className="form-label"><FormattedMessage id="film-manage.duration" /></span>
                                                    <input className="form-control" type="text" placeholder="..."
                                                        value={duration}
                                                        onChange={(event) => { this.onChangeInput(event, 'duration') }}

                                                    />
                                                </div>
                                                <div className="language col-md-5">
                                                    <span className="form-label"><FormattedMessage id="film-manage.language" /></span>
                                                    <input className="form-control" type="text" placeholder="..."
                                                        value={language}
                                                        onChange={(event) => { this.onChangeInput(event, 'language') }}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group-select col-md-12">
                                            <div className="genre col-6">
                                                <span className="form-label-select"><FormattedMessage id="film-manage.genre" /></span>
                                                <select className="form-control-select"
                                                    onChange={(event) => { this.onChangeInput(event, 'genre') }}
                                                    value={genre}
                                                >
                                                    {genres && genres.length > 0 &&
                                                        genres.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.keyMap}>
                                                                    {languages === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className="select-arrow"></span>
                                            </div>
                                            <div className="show col-6">
                                                <span className="form-label-select"><FormattedMessage id="film-manage.show" /></span>
                                                <select className="form-control-select"
                                                    onChange={(event) => { this.onChangeInput(event, 'show') }}
                                                    value={show}
                                                >
                                                    {shows && shows.length > 0 &&
                                                        shows.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.keyMap}>
                                                                    {languages === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className="select-arrow"></span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <span className="form-label"><FormattedMessage id="film-manage.avatar" /></span>
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
                                        <div className="form-btn">
                                            <div className={this.state.action === CRUD_ACTIONS.EDIT ? "btn-edit" : "btn-save"}
                                                onClick={() => this.handleSaveFilm()}
                                            ><div className="title-save">
                                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                                        <FormattedMessage id="film-manage.edit" />
                                                        :
                                                        <FormattedMessage id="film-manage.save" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="container-film col-md-1">

                                    {/* <TableManageFilms
                                        handleEditFilmFromParentKey={this.handleEditFilmFromParent}
                                        action={this.state.action}
                                    /> */}
                                    <ModalFilm
                                        handleEditFilmFromParentKey={this.handleEditFilmFromParent}
                                        action={this.state.action}
                                        isOpen={this.state.isOpenModalFilm}
                                        toggleFromParent={this.toggleFilmModal}
                                        currentFilm={this.state.filmEdit}
                                    // editUser={this.doEditUser}
                                    />
                                    <button
                                        className="btn-film btn-primary px-3"
                                        onClick={() => this.handleFetchFilm()}
                                    ><i className="fas fa-box-open"></i>
                                        <FormattedMessage id="modal.list-films" />
                                    </button>
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
                </div>
            </React.Fragment>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genreRedux: state.film.genre,
        showRedux: state.film.show,
        isLoadingGenre: state.film.isLoadingGenre,
        allFilmsRedux: state.film.allFilms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenreStart: () => dispatch(actions.fetchGenreStart()),
        getShowStart: () => dispatch(actions.fetchShowStart()),
        createNewFilmRedux: (data) => dispatch(actions.createNewFilm(data)),
        fetchAllFilmsRedux: () => dispatch(actions.fetchAllFilms()),
        editAFilmRedux: (data) => dispatch(actions.editAFilm(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmRedux);
