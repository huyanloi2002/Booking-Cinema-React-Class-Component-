import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, MONEY } from '../../utils';
import './BillToPDF.scss';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import moment from 'moment';
import * as actions from '../../store/actions'
import { getBookingFilmToBill } from '../../services/filmService'

class BillToPDF extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invoiceId: 0,
            dateBook: '',
            logo: require("../../../src/assets/logo.ico").default,
            email: this.props.location.state.arrFilm.emailUser,
            lastName: this.props.location.state.arrFilm.lastName,
            firstName: this.props.location.state.arrFilm.firstName,
            phoneNumber: this.props.location.state.arrFilm.phonenumber,
            address: this.props.location.state.arrFilm.address,
            filmId: this.props.location.state.arrFilm.FilmId,
            nameFilm: this.props.location.state.arrFilm.nameFilm,
            date: this.props.location.state.arrFilm.dates,
            dayTimeStamp: this.props.location.state.arrFilm.dayTimeStamp,
            cinemaTech: this.props.location.state.arrFilm.cinemaTech,
            timeType: this.props.location.state.arrFilm.timeType,
            timeDetail: this.props.location.state.arrFilm.detailHourss,
            seat: this.props.location.state.arrFilm.keyMapSeat,
            inforCombo: this.props.location.state.arrFilm.inforCombo,
            coutCombo1: '',
            coutCombo2: '',
            coutCombo3: '',
            totalCombo1: '',
            totalCombo2: '',
            totalCombo3: '',
            detailCombo1: '',
            detailCombo2: '',
            detailCombo3: '',
            totalPromotionPaypal: this.props.location.state.arrFilm.totalPromotionPaypal,
            totalSeatPaypal: this.props.location.state.arrFilm.totalSeatPaypal,
            totalComboPaypal: this.props.location.state.arrFilm.totalComboPaypal,
            totalPrice: this.props.location.state.arrFilm.totalPrice,
            inforBooking: [],

        }
    }
    async componentDidMount() {
        let { filmId, dayTimeStamp, cinemaTech, timeType, seat,
            inforCombo
        } = this.state
        let res = await getBookingFilmToBill(filmId, dayTimeStamp, cinemaTech, timeType, seat)
        if (res && res.errCode === 0) {
            this.setState({
                inforBooking: res.dataBill ? res.dataBill : [],
            })
        };
        if (inforCombo && inforCombo.length > 0 && inforCombo.map((item, index) => {
            let pricePaypalCombo = parseFloat(item.priceDataCombo.valueEn)
            let detailCombo = item.name
            let coutCombos = item.cout
            if (item.cout >= 1 && index === 0) {
                this.setState({
                    totalCombo1: pricePaypalCombo * item.cout + MONEY.DOLLAR,
                    combo1: detailCombo,
                    coutCombo1: coutCombos,
                })
            }
            else if (item.cout >= 1 && index == 1) {
                this.setState({
                    totalCombo2: pricePaypalCombo * item.cout + MONEY.DOLLAR,
                    combo2: detailCombo,
                    coutCombo2: coutCombos,
                })

            }
            else if (item.cout >= 1 && index == 2) {
                this.setState({
                    totalCombo3: pricePaypalCombo * item.cout + MONEY.DOLLAR,
                    combo3: detailCombo,
                    coutCombo3: coutCombos,
                })
            }
        }));
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.inforBooking !== this.state.inforBooking) {
            let { inforBooking } = this.state
            {
                inforBooking && inforBooking.length > 0 && inforBooking.map((item) => {
                    let invoiceIds = item.id
                    let dayBooks = item.createdAt
                    if (item.id) {
                        this.setState({
                            invoiceId: invoiceIds,
                            dateBook: dayBooks
                        })

                    }
                })
            }
        }
    }
    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                let imgWidth = 208;
                let imgHeight = canvas.height * imgWidth / canvas.width;
                const imgData = canvas.toDataURL('img/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                // pdf.output('dataurlnewwindow');
                pdf.save("billbycinedalat.pdf");
            })
            ;
    }
    returnBack = () => {
        if (this.props.history) {
            let { filmId } = this.state
            this.props.history.push(`/infor_movies/${filmId}`)
        }
    }
    render() {

        let { logo, invoiceId, dateBook, email, firstName, lastName, address,
            phoneNumber, nameFilm, date, cinemaTech, timeDetail, seat, totalSeatPaypal,
            combo1, combo2, combo3, coutCombo1, coutCombo2, coutCombo3, totalCombo1, totalCombo2, totalCombo3
            , totalComboPaypal, totalPromotionPaypal, totalPrice
        } = this.state
        let { language } = this.props
        let dayBooks = moment(dateBook).format('HH:ss DD/MM/YYYY');
        console.log('e', combo2)
        return (
            <div id="divToPrint">
                <div className="container">
                    <div className="brand-section">
                        <div className="row">
                            <div className="col-6">
                                <img className="image-logo" src={logo} />
                            </div>
                            <div className="col-6">
                                <div className="company-details">
                                    <p className="text-white"><FormattedMessage id="bill.cine-dalat" /></p>
                                    <p className="text-white"><FormattedMessage id="bill.address-cine" /></p>
                                    <p className="text-white"><FormattedMessage id="bill.hottline-cine" /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="body-section">
                        <div className="row">
                            <div className="col-6">
                                <h2 className="heading"><FormattedMessage id="bill.invoiceId" />
                                    #{invoiceId}
                                </h2>
                                <p className="sub-heading"><FormattedMessage id="bill.orderDate" />
                                    {dayBooks}
                                </p>
                                <p className="sub-heading"><FormattedMessage id="bill.emailUser" />
                                    {email}
                                </p>
                            </div>
                            <div className="col-6">
                                <p className="sub-heading"><FormattedMessage id="bill.nameUser" />
                                    {language === LANGUAGES.VI ? lastName + ' ' + firstName : firstName + ' ' + lastName}
                                </p>
                                <p className="sub-heading"><FormattedMessage id="bill.address" />
                                    {address}
                                </p>
                                <p className="sub-heading"><FormattedMessage id="bill.phoneNumber" />
                                    {phoneNumber}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="body-section">
                        <h3 className="heading"><FormattedMessage id="bill.orderedDetail" /></h3>
                        <br />
                        <table className="table-bordered">
                            <thead>
                                <tr>
                                    <th> <FormattedMessage id="bill.description" /></th>
                                    <th className="w-20"><FormattedMessage id="bill.product" /></th>
                                    <th className="w-20"><FormattedMessage id="bill.quantity" /></th>
                                    <th className="w-20"><FormattedMessage id="bill.price" /></th>
                                    <th className="w-20"><FormattedMessage id="bill.total" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="desciption">
                                            <div>{nameFilm}</div>
                                            <div>{date}</div>
                                            <div>{cinemaTech}</div>
                                            <div>{timeDetail}</div>
                                        </div>
                                    </td>
                                    <td>{seat}</td>
                                    <td>1</td>
                                    <td>{totalSeatPaypal + MONEY.DOLLAR}</td>
                                    <td className="total">{totalSeatPaypal + MONEY.DOLLAR}</td>
                                </tr>
                                <tr>
                                    <td><FormattedMessage id="bill.DA/NU" /></td>
                                    <td>
                                        <div> {combo1}</div>
                                        <div> {combo2}</div>
                                        <div> {combo3}</div>
                                    </td>
                                    <td>
                                        <div> {coutCombo1}</div>
                                        <div> {coutCombo2}</div>
                                        <div> {coutCombo3}</div>
                                    </td>
                                    <td>
                                        <div> {totalCombo1}</div>
                                        <div> {totalCombo2}</div>
                                        <div> {totalCombo3}</div>
                                    </td>
                                    <td className="total">{totalComboPaypal + MONEY.DOLLAR}</td>
                                </tr>
                                <tr>
                                    <td colspan="4" className="text-right">
                                        <FormattedMessage id="bill.subTotal" />
                                    </td>
                                    <td className="total"> {Number((totalComboPaypal + totalSeatPaypal).toFixed(2)) + MONEY.DOLLAR}</td>
                                </tr>
                                <tr>
                                    <td colspan="4" className="text-right">
                                        <FormattedMessage id="bill.promotion" />
                                    </td>
                                    <td className="total">{totalPromotionPaypal + MONEY.DOLLAR}</td>
                                </tr>
                                <tr>
                                    <td colspan="4" className="text-right">
                                        <FormattedMessage id="bill.grandTotal" />
                                    </td>
                                    <td className="grandtotal">{totalPrice + MONEY.DOLLAR}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <h3 className="heading"><FormattedMessage id="bill.paymentStatus" />
                            <span className="text"><FormattedMessage id="bill.paid" /></span>
                        </h3>
                        <h3 className="heading"><FormattedMessage id="bill.paymentMode" />
                            <span className="text"><FormattedMessage id="bill.paypal" /></span>
                        </h3>
                    </div>
                    <div className="body-section">
                        <div className="button-content">
                            <button className="btn-back"
                                onClick={this.returnBack}
                            ><FormattedMessage id="bill.back" /></button>
                            <button className="btn-export"
                                onClick={this.printDocument}
                            ><FormattedMessage id="bill.exportBill" /></button>
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createBookingRedux: (data) => dispatch(actions.createBookingAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillToPDF);
