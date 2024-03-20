import { right } from '@popperjs/core';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './PostNowShowing.scss'
import Select from 'react-select';
import { getMarkdownFilm } from '../../../services/filmService';


const mdParser = new MarkdownIt;

class PostNowShowing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedFilm: '',
            description: '',
            listAllFilm: [],
            hasOldData: false,
        }
    }
    componentDidMount() {
        this.props.fetchAllFilmsRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allFilms !== this.props.allFilms) {
            let dataSelectFilm = this.buildDataInputSelect(this.props.allFilms)
            this.setState({
                listAllFilm: dataSelectFilm
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
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveInforFilm({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            filmId: this.state.selectedFilm.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }
    handleChangeSelectFilm = async (selectedFilm) => {
        this.setState({ selectedFilm });
        let res = await getMarkdownFilm(selectedFilm.value);
        if (res && res.errCode === 0 && res.data) {
            let markdown = res.data;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    };
    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        let { hasOldData } = this.state;
        let language = this.props.language
        return (
            <div className="film-redux-container">
                <div className="title">
                    BOOKING CINE-FILM
                </div>
                <div className="film-redux-body film-form my-2" >
                    <div className="container col-md-12">
                        <div className="row">
                            <div className="container-post col-md-12">
                                <div className="row">
                                    <div className="more-infor">
                                        <div className="row">
                                            <div className="content-left">
                                                <label className="title-name">Chọn phim:</label>
                                                <Select
                                                    value={this.state.selectedFilm}
                                                    onChange={this.handleChangeSelectFilm}
                                                    options={this.state.listAllFilm}
                                                    className="form-control select-content"
                                                />
                                            </div>
                                            <div className="content-right form-group">
                                                <label className="title-name">Thông tin giới thiệu:</label>
                                                <textarea className="form-control" rows="12"
                                                    onChange={(event) => this.handleOnChangeDescription(event)}
                                                    value={this.state.description}
                                                >
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-btn col-md-4">
                                        <button className=
                                            {hasOldData === true ? "edit-btn" : "create-btn"}
                                            onClick={() => this.handleSaveContentMarkdown()}
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
                <div className="film-redux-body" >
                    <div className="container col-md-12">
                        <div className="row">
                            <div className="container-post col-md-12">
                                <MdEditor
                                    style={{ height: '500px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.contentMarkdown}
                                />
                            </div>
                        </div>
                    </div>
                </div>
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
        saveInforFilm: (data) => dispatch(actions.saveInforFilm(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostNowShowing);
