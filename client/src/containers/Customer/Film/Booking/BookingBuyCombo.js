import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingBuyCombo.scss';
import { LANGUAGES, MONEY, TRUEFALSE } from '../../../../utils';
import * as actions from '../../../../store/actions'
import { every } from 'lodash';
import { getBuyComboById } from '../../../../services/filmService';

class BookingBuyCombo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrBuyCombo: [],
            arrBuyCombos: [],
            allCombo: [],
            cout: 0

        }
    }
    componentDidMount() {
        this.props.fetchAllBuyComboRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allBuyCombosRedux !== this.props.allBuyCombosRedux) {
            let arrBuyCombos = this.props.allBuyCombosRedux
            this.setState({
                arrBuyCombo: arrBuyCombos,
            })
        }
    }
    handleIncrement = (comboId) => {
        let { arrBuyCombo } = this.state;
        if (arrBuyCombo && arrBuyCombo.length > 0) {
            arrBuyCombo = arrBuyCombo.map(item =>
                comboId === item.id ? { ...item, cout: item.cout + (item.cout < 4 ? 1 : 0) } : item,
            )
            this.setState({
                arrBuyCombo: arrBuyCombo
            })
        }
    }
    handleDecrement = (comboId) => {
        let { arrBuyCombo } = this.state;
        if (arrBuyCombo && arrBuyCombo.length > 0) {
            arrBuyCombo = arrBuyCombo.map(item =>
                comboId === item.id ? { ...item, cout: item.cout - (item.cout > 0 ? 1 : 0) } : item,
            )
            this.setState({
                arrBuyCombo: arrBuyCombo
            })
        }

    }
    render() {
        let { arrBuyCombo } = this.state
        this.props.inforCombo(this.state.arrBuyCombo)
        let { language } = this.props
        return (
            <div>
                <div className="booking-buy-combo-container col-md-12">
                    <div className="content-combo col-md-12">
                        <div className="row">
                            {arrBuyCombo && arrBuyCombo.length > 0 && arrBuyCombo.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer.from(item.image, 'base64').toString('binary');
                                }
                                return (
                                    <div className="all-combo col-md-6" key={index}>
                                        <div className="image-combo" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                        <div className="content-combo">
                                            <div className="name-combo">
                                                {item.name}
                                            </div>
                                            <div className="infor-combo">
                                                {item.description}
                                            </div>
                                            <div className="price-combo">
                                                <div className="price-content">
                                                    <label className="title-price"><FormattedMessage id="booking.title-price" /></label>
                                                    <div className="price">{language === LANGUAGES.VI ? item.priceDataCombo.valueVi + MONEY.DONG : item.priceDataCombo.valueEn + MONEY.DOLLAR}</div>
                                                </div>
                                                <div className="cout" >
                                                    <button className="minus" type="button" onClick={() => this.handleDecrement(item.id)} >-</button>
                                                    <div className="inputne" >{item.cout}</div>
                                                    <button className="plus" type="button" onClick={() => this.handleIncrement(item.id)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
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
        allBuyCombosRedux: state.film.allBuyCombo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllBuyComboRedux: () => dispatch(actions.fetchAllBuyCombo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingBuyCombo);
