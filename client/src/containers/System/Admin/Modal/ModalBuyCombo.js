import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalBuyCombo.scss'
import { LANGUAGES, MONEY } from '../../../../utils';
import * as actions from '../../../../store/actions'

class ModalBuyCombo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrBuyCombo: []
        }
    }

    componentDidMount() {
        this.props.loadAllBuyCombo()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allBuyCombosRedux !== this.props.allBuyCombosRedux) {
            this.setState({
                arrBuyCombo: this.props.allBuyCombosRedux,
            })
        }
    }
    handleDeleteBuyCombo = (buyCombo) => {
        this.props.deleteBuyComboRedux(buyCombo.id);
    }
    handleEditBuyCombo = (buyCombo) => {
        this.props.handleEditBuyComboFromParentKey(buyCombo)
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        let arrAllBuyCombos = this.state.arrBuyCombo;
        let { language } = this.props
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-buy-combo-container'}
                size="lg"
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    <FormattedMessage id="modal.list-buycombos" />
                </ModalHeader>
                <ModalBody>
                    <div className="fresh-table full-color-orange">
                        <table id="fresh-table" className="table">
                            <thead>
                                <th >Name</th>
                                <th >Price</th>
                                <th >Image</th>
                            </thead>
                            <tbody>
                                {arrAllBuyCombos && arrAllBuyCombos.length > 0
                                    && arrAllBuyCombos.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer.from(item.image, 'base64').toString('binary');
                                        }
                                        return (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{language === LANGUAGES.VI ? item.priceDataCombo.valueVi + MONEY.DONG : item.priceDataCombo.valueEn + MONEY.DOLLAR}</td>
                                                <td className="img-post" style={{ backgroundImage: `url(${imageBase64})` }}></td>
                                                <td className="btn-action">
                                                    <button className="btn-edit" onClick={() => { this.handleEditBuyCombo(item) }}><i className="fas fa-edit"></i></button>
                                                    <button className="btn-delete" onClick={() => { this.handleDeleteBuyCombo(item) }}><i className="fas fa-trash-alt"></i></button>
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
        allBuyCombosRedux: state.film.allBuyCombo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllBuyCombo: () => dispatch(actions.fetchAllBuyCombo()),
        deleteBuyComboRedux: (id) => dispatch(actions.deleteBuyComboAction(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBuyCombo);




