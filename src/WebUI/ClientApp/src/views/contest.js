import React, { Component } from "react";
import { API_URL } from "../constants/API";
import { loadData } from "../data/api";
import ReactTimeAgo from 'react-time-ago';

class Contest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contest: {
                active: [],
                upcoming: []
            },
            currentTab: 'active'
        }
    }

    componentDidMount = () => {
        loadData(API_URL.GET_CONTEST).then(x => {
            this.setState({
                contest: {
                    active: x.active,
                    upcoming: x.upcoming
                }
            })
        })
    }

    setActiveTab = (e, tabName) => {
        e.preventDefault();
        this.setState({
            currentTab: tabName
        })
    }

    render() {
        let { active, upcoming } = this.state.contest;
        return (
            <div className="row">
                <div className="col-md-12">
                    <ul className="nav nav-tabs card-header-tabs" id="innerTab" role="tablist">
                        <li className="nav-item">
                            <a className={"nav-link " + (this.state.currentTab == 'active' ? 'active' : '')} href="#" onClick={x => this.setActiveTab(x, 'active')} data-toggle="tab" role="tab" aria-expanded="true">
                                Active
        </a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link " + (this.state.currentTab == 'upcoming' ? 'active' : '')} href="#" onClick={x => this.setActiveTab(x, 'upcoming')} data-toggle="tab" role="tab">
                                Upcoming
        </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className={"tab-pane " + (this.state.currentTab == 'active' ? 'active' : '')} role="tabpanel">
                            <div className="row">
                                {active.map((activeContest) => {
                                    const createdOn = activeContest.createdOn + 'Z';
                                    return (
                                        <div className="col-md-12">
                                            <div className="contest-box offer-box">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="logo d-inline-block align-bottom">
                                                            <img src={activeContest.brandLogo} alt />
                                                        </div>
                                                        <div className="content d-inline-block">
                                                            <p>
                                                                <a href="brand-home.html"><strong>{activeContest.brandName}</strong></a>
                                                                {
                                                                    activeContest.isVerified && <span className="verified">
                                                                        <i className="fa fa-check-circle" />
                                                                    </span>
                                                                }
                                                            </p>
                                                            <p>
                                                                <ReactTimeAgo date={new Date(createdOn)} locale="en-US" />
                                                                <span><i className="fa fa-globe" /></span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {
                                                        activeContest.imageUrl &&
                                                        <div className="col-md-12">
                                                            <div className="banner">
                                                                <img src={activeContest.imageUrl} className="img-fluid" alt />
                                                            </div>
                                                        </div>
                                                    }

                                                    <div className="col-md-12">
                                                        <div className="contest-content">
                                                            <p className="contest-name">
                                                                <strong>{activeContest.title}</strong>
                                                            </p>
                                                            <p className="contest-description">
                                                                {activeContest.description}
                                                            </p>
                                                            <p className="contest-last-date">
                                                                <strong>{activeContest.createdOn}</strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <a href={activeContest.redirectUrl} target="_blank" className="btn btn-warning">Participate Now</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                        <div className={"tab-pane " + (this.state.currentTab == 'upcoming' ? 'active' : '')} role="tabpanel">
                            <div className="row">
                                {upcoming.map((upcomingContest) => {
                                    const createdOn = upcomingContest.createdOn + 'Z';
                                    return (
                                        <div className="col-md-12">
                                            <div className="contest-box offer-box">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="logo d-inline-block align-bottom">
                                                            <img src={upcomingContest.brandLogo} alt />
                                                        </div>
                                                        <div className="content d-inline-block">
                                                            <p>
                                                                <a href="brand-home.html"><strong>{upcomingContest.brandName}</strong></a>
                                                                {
                                                                    upcomingContest.isVerified && <span className="verified">
                                                                        <i className="fa fa-check-circle" />
                                                                    </span>
                                                                }
                                                            </p>
                                                            <p>
                                                                <ReactTimeAgo date={new Date(createdOn)} locale="en-US" />
                                                                <span><i className="fa fa-globe" /></span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {
                                                        upcomingContest.imageUrl &&
                                                        <div className="col-md-12">
                                                            <div className="banner">
                                                                <img src={upcomingContest.imageUrl} className="img-fluid" alt />
                                                            </div>
                                                        </div>
                                                    }

                                                    <div className="col-md-12">
                                                        <div className="contest-content">
                                                            <p className="contest-name">
                                                                <strong>{upcomingContest.title}</strong>
                                                            </p>
                                                            <p className="contest-description">
                                                                {upcomingContest.description}
                                                            </p>
                                                            <p className="contest-last-date">
                                                                <strong>{upcomingContest.createdOn}</strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <a href={upcomingContest.redirectUrl} target="_blank" className="btn btn-warning">Participate Now</a>
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
            </div>
        )
    }
}

export default Contest;