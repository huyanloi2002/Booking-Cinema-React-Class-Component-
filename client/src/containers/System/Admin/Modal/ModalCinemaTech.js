import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isTemplateLiteralToken } from 'typescript';
import './ModalCinemaTech.scss'
import { LANGUAGES } from '../../../../utils';
import * as actions from '../../../../store/actions'


class ModalCinemaTech extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrCinemaTech: []
        }
    }

    componentDidMount() {
        // this.props.fetchAllFilmsRedux();
        this.props.loadAllCinemaTech();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listFilms !== this.props.listFilms) {
        //     this.setState({
        //         filmsRedux: this.props.listFilms
        //     })
        // }
        if (prevProps.allCinemaTechsRedux !== this.props.allCinemaTechsRedux) {
            this.setState({
                arrCinemaTech: this.props.allCinemaTechsRedux,
            })
        }


    }
    handleDeleteCinemaTech = (cinemaTech) => {
        this.props.deleteCinemaTechRedux(cinemaTech.id);
    }
    handleEditCinemaTech = (cinemaTech) => {
        this.props.handleEditCinemaTechFromParentKey(cinemaTech)
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        let arrAllCinemaTechs = this.state.arrCinemaTech;
        let { language } = this.props
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-cinema-container'}
                size="lg"
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    <FormattedMessage id="modal-list-cinemas" />
                </ModalHeader>
                <ModalBody>
                    <div className="fresh-table full-color-orange">
                        <table id="fresh-table" className="table">
                            <thead>
                                <th >Name</th>
                                <th >Image</th>
                            </thead>
                            <tbody>
                                {arrAllCinemaTechs && arrAllCinemaTechs.length > 0
                                    && arrAllCinemaTechs.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer.from(item.image, 'base64').toString('binary');
                                        }
                                        return (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td className="img-post" style={{ backgroundImage: `url(${imageBase64})` }}></td>
                                                <td className="btn-action">
                                                    <button className="btn-edit" onClick={() => { this.handleEditCinemaTech(item) }}><i className="fas fa-edit"></i></button>
                                                    <button className="btn-delete" onClick={() => { this.handleDeleteCinemaTech(item) }}><i className="fas fa-trash-alt"></i></button>
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
        allCinemaTechsRedux: state.film.allCinemaTechs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllCinemaTech: () => dispatch(actions.fetchAllCinemaTech()),
        deleteCinemaTechRedux: (id) => dispatch(actions.deleteCinemaTechAction(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCinemaTech);




