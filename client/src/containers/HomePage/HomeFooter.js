import React, { Component } from 'react';
import { connect } from 'react-redux';

import "@fontsource/quicksand";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';



class HomeFooter extends Component {


    render() {
        return (
            <div className="home-footer">
                <p>&copy; 2022 Quang Huy 19112002. More information.
                    <a target="_blank" href="https://www.facebook.com/quanghuy191120021/">
                        &#8594; Click here &#8592;
                    </a>
                </p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
