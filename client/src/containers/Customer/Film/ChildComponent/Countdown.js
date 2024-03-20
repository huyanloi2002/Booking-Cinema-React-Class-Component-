import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './Countdown.scss'
import { LANGUAGES } from '../../../../utils';
import { connect } from "react-redux";

class Countdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeCountdown: props.duration ? props.duration : 5
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            let { timeCountdown } = this.state
            this.setState({
                timeCountdown: timeCountdown - 1
            })
        }, 1000)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.timeCountdown !== this.state.timeCountdown && this.state.timeCountdown === 0) {
            clearInterval(this.timer);
            if (this.props.onTime) {
                this.props.onTime()
            }
        }

    }
    fmtMSS(s) { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s }
   
    render() {
        let { timeCountdown } = this.state
        return (
            <div className="countdown-container">
                <div className="countdown-content">
                    <div className="title-content">
                    </div>
                    <div className="countdown">
                        <div className="time">
                            <span className="title-countdown">{this.fmtMSS(timeCountdown)}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);




