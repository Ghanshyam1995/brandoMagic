import React, { Component } from "react";
import { API_URL } from "../constants/API";
import { loadData } from "../data/api";

class Discussion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discussions: []
        }
    }


    componentDidMount = () => {
        loadData(API_URL.GET_DISCUSSION).then(x => {
            this.setState({
                discussions: x
            })
        })
    }

    render() {
        let { discussions } = this.state;
        return (
            <div className="row">
                {
                    discussions && discussions.map((d) => {
                        return (
                            <div className="col-md-12" key={ d.id }>
                                <div className="post-box">
                                    <div className="post-box-wrapper">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="logo d-inline-block align-bottom">
                                                    <img src={d.brandLogo} alt={ d.brandName } />
                                                </div>
                                                <div className="content d-inline-block">
                                                    <p>
                                                        <a href="brand-home.html">
                                                            <strong>{ d.brandName }</strong>
                                                        </a>
                                                        <span className="verified">
                                                            <i className="fa fa-check-circle" />
                                                        </span>
                                                    </p>
                                                    <p>
                                                        21h <span>.</span>
                                                        <span>
                                                            <i className="fa fa-globe" />
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className=" box-ques">
                                                    <div className="user-name">
                                                        <p>Ghanshyam Singh</p>
                                                    </div>
                                                    <div className="whats-your-ques">
                                                        <a href="#" data-toggle="modal" data-target="#questionModal">
                                                            What is your question or link?
                </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="question-wrapper">
                                                <div className="col-md-12">
                                                    <div className="questions">
                                                        <p className="question">
                                                            <strong>{ d.title }</strong>
                                                        </p>
                                                        <p className="answer">
                                                            {d.description }
                </p>
                                                    </div>
                                                    <div className="like-comment-share">
                                                        <div className="action-to-do">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <a href="#">
                                                                        <i className="fa fa-thumbs-o-up" /> Like
                      </a>
                                                                </div>
                                                                <div className="col-md-4 text-center">
                                                                    <a href="#">
                                                                        <i className="fa fa-comment-o" /> Comment
                      </a>
                                                                </div>
                                                                <div className="col-md-4 text-right">
                                                                    <a href="#">
                                                                        <i className="fa fa-share" /> Share
                      </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12" id="doComment">
                                                    <div className="comment-box">
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <div className="profile-image text-center">
                                                                    <img
                                                                        src="img/brands/icons/flipkart.png"
                                                                        className="img-fluid"
                                                                        alt
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-10">
                                                                <div className="write-comment">
                                                                    <textarea
                                                                        className="form-control d-inline-block align-bottom"
                                                                        rows={1}
                                                                        placeholder="Write Your Comment.."
                                                                        defaultValue={""}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-success d-inline-block"
                                                                    >
                                                                        Post
                      </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                    })
                    
                }

            </div>
        )
    }
}

export default Discussion;

