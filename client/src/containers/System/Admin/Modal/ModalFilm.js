import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isTemplateLiteralToken } from 'typescript';
import './ModalFilm.scss'
import { LANGUAGES } from '../../../../utils';
import * as actions from '../../../../store/actions'


class ModalFilm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrFilms: []
        }
    }

    componentDidMount() {
        // this.props.fetchAllFilmsRedux();
        this.props.loadAllFilm();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listFilms !== this.props.listFilms) {
        //     this.setState({
        //         filmsRedux: this.props.listFilms
        //     })
        // }
        if (prevProps.allFilmsRedux !== this.props.allFilmsRedux) {
            this.setState({
                arrFilms: this.props.allFilmsRedux,
            })
        }


    }
    handleDeleteFilm = (film) => {
        this.props.deleteAFilmRedux(film.id);
    }
    handleEditFilm = (film) => {
        this.props.handleEditFilmFromParentKey(film)
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        let arrAllFilms = this.state.arrFilms;
        let { language } = this.props
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-film-container'}
                size="lg"
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    <FormattedMessage id="modal.list-films" />
                </ModalHeader>
                <ModalBody>
                    <div className="fresh-table full-color-orange">
                        <table id="fresh-table" className="table">
                            <thead>
                                <th >NameVI</th>
                                <th >NameEN</th>
                                <th >Genre</th>
                                <th >Show</th>
                                <th >Image</th>
                                <th >Action</th>
                            </thead>
                            <tbody>
                                {arrAllFilms && arrAllFilms.length > 0
                                    && arrAllFilms.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                        }
                                        let genreVi = `${item.genreData.valueVi}`;
                                        let genreEn = `${item.genreData.valueEn}`;
                                        let showVi = `${item.showData.valueVi}`;
                                        let showEn = `${item.showData.valueEn}`;
                                        let nameFilmVi = `${item.nameVi}`;
                                        let nameFilmEn = `${item.nameEn}`;
                                        return (
                                            <tr key={index}>
                                                <td>{nameFilmVi}</td>
                                                <td>{nameFilmEn}</td>
                                                <td>{language === LANGUAGES.VI ? genreVi : genreEn}</td>
                                                <td>{language === LANGUAGES.VI ? showVi : showEn}</td>
                                                <td className="img-post" style={{ backgroundImage: `url(${imageBase64})` }}></td>
                                                <td className="btn-action">
                                                    <button className="btn-edit" onClick={() => { this.handleEditFilm(item) }}><i className="fas fa-edit"></i></button>
                                                    <button className="btn-delete" onClick={() => { this.handleDeleteFilm(item) }}><i className="fas fa-trash-alt"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>
                    </div>

                </ModalBody>
                {/* <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => {
                            this.handAddNewUser()
                        }
                        }>Add new</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter> */}
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allFilmsRedux: state.film.allFilms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllFilm: () => dispatch(actions.fetchAllFilms()),
        deleteAFilmRedux: (id) => dispatch(actions.deleteAFilm(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalFilm);




