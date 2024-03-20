import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isTemplateLiteralToken } from 'typescript';
import './ModalNews.scss'
import { LANGUAGES } from '../../../../utils';
import * as actions from '../../../../store/actions'


class ModalNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNew: [],
        }
    }

    componentDidMount() {
        // this.props.fetchAllFilmsRedux();
        this.props.loadAllNews();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listFilms !== this.props.listFilms) {
        //     this.setState({
        //         filmsRedux: this.props.listFilms
        //     })
        // }
        if (prevProps.allNewsRedux !== this.props.allNewsRedux) {
            this.setState({
                arrNew: this.props.allNewsRedux,
            })
        }


    }
    handleDeleteNews = (news) => {
        this.props.deleteNewsRedux(news.id);
    }
    handleEditNews = (news) => {
        this.props.handleEditNewsFromParentKey(news)
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        let arrAllNews = this.state.arrNew;
        let { language } = this.props
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-news-container'}
                size="lg"
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    Danh sách tin tức
                </ModalHeader>
                <ModalBody>
                    <div className="fresh-table full-color-orange">
                        <table id="fresh-table" className="table">
                            <thead>
                                <th >Title</th>
                                <th >Name Author</th>
                                <th >Author</th>
                                <th >Image Content</th>
                                <th >Time</th>
                                <th >Action</th>
                            </thead>
                            <tbody>
                                {arrAllNews && arrAllNews.length > 0
                                    && arrAllNews.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.imageNew) {
                                            imageBase64 = new Buffer.from(item.imageNew, 'base64').toString('binary');
                                        }
                                        let imageBase64s = '';
                                        if (item.imageAuthor) {
                                            imageBase64s = new Buffer.from(item.imageAuthor, 'base64').toString('binary');
                                        }
                                        return (
                                            <tr key={index}>
                                                <td>{item.description}</td>
                                                <td>{item.nameAuthor}</td>
                                                <td className="img-post-author" style={{ backgroundImage: `url(${imageBase64s})` }}></td>
                                                <td className="img-post-news" style={{ backgroundImage: `url(${imageBase64})` }}></td>
                                                <td>{item.createdAt}</td>
                                                <td className="btn-action">
                                                    <button className="btn-edit" onClick={() => { this.handleEditNews(item) }}><i className="fas fa-edit"></i></button>
                                                    <button className="btn-delete" onClick={() => { this.handleDeleteNews(item) }}><i className="fas fa-trash-alt"></i></button>
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
        allNewsRedux: state.film.allNew
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllNews: () => dispatch(actions.fetchAllNews()),
        deleteNewsRedux: (id) => dispatch(actions.deleteNewsAction(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalNews);




