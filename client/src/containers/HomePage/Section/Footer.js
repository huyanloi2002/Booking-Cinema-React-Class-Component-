import { connect } from 'react-redux';
import './Footer.scss'
import "@fontsource/quicksand";
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';


class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        return (
            <div className="container-footer">
                <div className="content-footer">
                    <div className="footer-brand-slide">
                        <div className="list-cinema">
                            <ul>
                                <li><a className="dx" href="#">4DX</a></li>
                                <li><a className="imax" href="#">Imax</a></li>
                                <li><a className="starium" href="#">Starium</a></li>
                                <li><a className="gold-class" href="#">Goldclass</a></li>
                                <li><a className="lamour" href="#">L'amour</a></li>
                                <li><a className="sweet" href="#">Sweetbox</a></li>
                                <li><a className="dolby-atmos" href="#">Dolby Atmos</a></li>
                                <li><a className="premium-cinema" href="#">Premium Cinema</a></li>
                                <li><a className="screenx" href="#">Screenx</a></li>
                                <li><a className="cine-foret" href="#">Cine &amp; Foret</a></li>
                                <li><a className="cine-livingroom" href="#">Cine &amp; Living Room</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-policy">
                        <div className="content-policy">
                            <div className="booking-cine-mov">
                                <h3><FormattedMessage id="footer.BOOKING-CINE-DALAT" /></h3>
                                <ul>
                                    <li><a href="#"><FormattedMessage id="footer.Introduce" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.Online-Utilities" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.Gift-Card" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.Recruit" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.Ad-Contacts" /></a></li>
                                </ul>
                            </div>
                            <div className="policy">
                                <h3><FormattedMessage id="footer.TERMS-OF-USE" /></h3>
                                <ul>
                                    <li><a href="#"><FormattedMessage id="footer.General-Terms" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.Terms-of-Transactions" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.Payment-Policy" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.Privacy-Policy" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.FAQs" /></a></li>
                                </ul>
                            </div>
                            <div className="follow-us">
                                <h3><FormattedMessage id="footer.LINK-TO-TELL-US" /></h3>
                                <ul>
                                    <li><a className="fb" href="#">Facebook</a></li>
                                    <li><a className="ytb" href="#">YouTube</a></li>
                                    <li><a className="ins" href="#">Instagram</a></li>
                                    <li><a className="zalo" href="#">Zalo</a></li>
                                </ul>
                                <div className="permision">
                                    <h2 ><a href="#"><FormattedMessage id="footer.Ministry-of-Industry-and-Trade" /></a></h2>
                                </div>
                            </div>
                            <div className="customer">
                                <h3><FormattedMessage id="footer.CUSTOMER CARE" /></h3>
                                <ul>
                                    <li><p><FormattedMessage id="footer.Hotline" /></p></li>
                                    <li><p><FormattedMessage id="footer.Working-hours" /></p></li>
                                    <li><p><FormattedMessage id="footer.Email" /></p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-address">
                        <div className="address-content">
                            <div className="logo-footer-cgv">&nbsp;</div>
                            <div className="text-address">
                                <h3>NHÓM ĐỒ ÁN CÔNG NGHỆ THÔNG TIN K17 ĐH YERSIN ĐÀ LẠT</h3>
                                <p>Thành viên: Bùi Đoàn Quang Huy,Trần Nhật Hoàng, Phạm Văn Hoàng, K'Vảng.</p>
                                <p>Địa Chỉ:&nbsp;Trường đại học Yersin Đà Lạt, Phường 8 Tôn Thất Tùng,TP Đà Lạt,Lâm Đồng.</p>
                                <p>Hotline: 0905711601</p>
                                <p>COPYRIGHT 2022 CINE-DALAT. All RIGHTS RESERVED .</p>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
