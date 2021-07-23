import React, { Component, Fragment, useState } from "react";
import BannerSlider from "../components/banner";
import { loadData } from "../data/api";
import { API_URL } from "../constants/API";
import { connect } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import Help from "./help";
import Contest from "./contest";
import Discussion from "./discussion";
function PostHeader({ post }) {
    const postTime = post.createdOn + 'Z';
    return (
        <div className="col-md-12" >
            <div className="logo d-inline-block align-bottom">
                <img src={post.brandLogo} style={{ width: "60px", height: "60px" }} alt className="img-fluid" />
            </div>
            <div className="content d-inline-block">
                <p>
                    <strong>{post.brandName}</strong>
                    {
                        post.isVerified && <span className="verified"><i className="fa fa-check-circle" /></span>
                    }
                </p>
                <p> <ReactTimeAgo date={new Date(postTime)} locale="en-US" />
                    <span><i className="fa fa-globe" /></span>
                </p>
            </div>
        </div>
    );
}

function PostAction({ post, postLikeDislike }) {
    return (
        <div className="col-md-12">
            <div className="like-comment-share">
                <div className="action-discription">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="total-like">
                                <a href="#">
                                    <i className="fa fa-thumbs-up" /> {post.totalLikes}
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="total-comment-share text-right">
                                <div className="row">
                                    <div className="col-md-6">
                                        <a href="#">
                                            <i className="fa fa-comment-o" /> {post.totalComments}
                                        </a>
                                    </div>
                                    <div className="col-md-6">
                                        <a href="#">
                                            <i className="fa fa-share" /> 0
                                      </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="action-to-do">
                    <div className="row">
                        <div className="col-md-4">
                            <a href="#" onClick={e => postLikeDislike(e, post.postId)}>
                                <i className={post.liked ? "fa fa-thumbs-up" : "fa fa-thumbs-o-up"} /> Like
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
    )
}

function CommentsList({ comments }) {
    return (
        <div className="col-md-12" id="comments">
            { comments.map((cm) => {
                const commentTime = cm.createdOn + 'Z';
                return (
                    <div className="do-comment" key={cm.id}>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="profile-image">
                                    <img src={cm.profileImage} className="img-fluid" alt />
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className="written-comment">
                                    <p className="comment-given">
                                        <span className="p-name d-block"><strong>
                                            {cm.firstName}  &nbsp;
                                    </strong> <ReactTimeAgo date={new Date(commentTime)} locale="en-US" /></span>
                                       &nbsp; {cm.comment}

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

function PostComment({ profilePic, postComment, postId }) {
    const [input, setInput] = useState('');
    return (
        <div className="col-md-12" id="doComment">
            <div className="comment-box">
                <div className="row">
                    <div className="col-md-2">
                        <div className="profile-image text-center">
                            <img src={profilePic} className="img-fluid" alt />
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="write-comment">
                            <textarea className="form-control d-inline-block align-bottom" onInput={e => setInput(e.target.value)} rows={1} placeholder="Write Your Comment.." value={input} />
                            <button type="button" onClick={() => { postComment(input, postId); setInput(''); }} className="btn btn-success d-inline-block">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user && state.user.isLoggedIn,
        categories: state.category,
        brands: state.brands,
        profilePic: state.user && state.user.profileImage
    }
};

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            page: 'home'
        }
    }

    componentDidMount = async () => {
        let selectedBrands = this.props.brands.filter(x => x.isSelected == true).map(({ id }) => id);
        let selectedCategory = this.props.categories.filter(x => x.isSelected == true).map(({ id }) => id)
        let urlString = `brandIds=${selectedBrands.join(',')}&categoryIds=${selectedCategory.join(',')}`;
        loadData(API_URL.POST_API, urlString).then(post => this.setState({ posts: post }));
    }

    postLikeDislike = (e, postId) => {
        e.preventDefault();
        loadData(API_URL.POST_LIKE_DISLIKE, "", { PostId: postId }).then((x) => {
            let index = this.state.posts.findIndex(x => x.postId == postId);
            let postItems = this.state.posts;
            let postItem = Object.assign({}, this.state.posts[index], {
                liked: !this.state.posts[index].liked,
                totalLikes: this.state.posts[index].liked ? this.state.posts[index].totalLikes - 1 : this.state.posts[index].totalLikes + 1
            });
            postItems[index] = postItem;
            this.setState({
                posts: postItems
            })
        });
    }



    postComment = (comment, postId) => {
        loadData(API_URL.POST_COMMENT, "", { PostId: postId, Comment: comment }).then((cmt) => {
            let index = this.state.posts.findIndex(x => x.postId == postId);
            let postItems = this.state.posts;
            let postComments = [cmt, ...this.state.posts[index].comments];
            postItems[index].comments = postComments;
            this.setState({
                posts: postItems
            })
        });
    }

    changePage = (pageName, e) => {
        e.preventDefault();
        this.setState({
            page: pageName
        })
    }

    render() {
        const { page } = this.state;
        return (
            <Fragment>
                <BannerSlider />

                <div className="tab-navigation">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-xs-12">
                                <ul className="nav nav-tabs card-header-tabs" id="outerTab" role="tablist">
                                    <li className="nav-item">
                                        <a className={"nav-link " + (page ==='home' ? 'active' : '')}  data-toggle="tab" href="#" onClick={(e) => this.changePage('home', e)} aria-controls="tabs-1" role="tab" aria-expanded="true">
                                            <img src="img/icons/home.png" alt />
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={"nav-link " + (page === 'help' ? 'active' : '')} data-toggle="tab" href="#" onClick={(e) => this.changePage('help', e)} aria-controls="tabs-2" role="tab">
                                            <img src="img/icons/help.png" alt />
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={"nav-link " + (page === 'contest' ? 'active' : '')} data-toggle="tab" href="#" onClick={(e) => this.changePage('contest', e)} aria-controls="tabs-3" role="tab">
                                            <img src="img/icons/Contest.png" alt />
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#" onClick={(e) => this.changePage('discussion', e)} aria-controls="tabs-4" role="tab">
                                            <img src="img/icons/offers.png" alt />
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={"nav-link " + (page === 'discussion' ? 'active' : '')} data-toggle="tab" href="#" onClick={(e) => this.changePage('discussion', e)} aria-controls="tabs-5" role="tab">
                                            <img src="img/icons/discussion.png" alt />
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    {
                                        this.state.page === 'home' &&
                                        <div className={"tab-pane " + this.page ==='home' ? 'active' : ''} id="tabs-1" role="tabpanel">
                                            <div className="row">
                                                {
                                                    this.state.posts && this.state.posts.map((post) => {
                                                        return (
                                                            <div className="col-md-12" key={post.id}>
                                                                <div className="post-box">
                                                                    <div className="post-box-wrapper">
                                                                        <div className="row">
                                                                            <PostHeader post={post} />
                                                                            <div className="col-md-12">
                                                                                <div className="post-content">
                                                                                    <p>
                                                                                        {post.postDescription}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="post-banner">
                                                                                    <img src={post.postImageUrl} style={{ width: '100%' }} alt className="img-fluid" />
                                                                                </div>
                                                                            </div>
                                                                            <PostAction post={post} postLikeDislike={this.postLikeDislike} postId={post.postId} postComment={this.postComment} />
                                                                            <PostComment profilePic={this.props.profilePic} postComment={this.postComment} postId={post.postId} />
                                                                            <CommentsList comments={post.comments} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    }
                                    {
                                        this.state.page === 'help' && <Help />
                                    }

                                    {
                                        this.state.page == 'contest' && <Contest/>
                                    }
                                    {
                                        this.state.page == 'discussion' && <Discussion />
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
}

export default connect(mapStateToProps)(UserDashboard);