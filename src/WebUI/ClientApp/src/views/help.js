import React, { Component, useState } from "react";
import { API_URL } from "../constants/API";
import { loadData } from "../data/api";
import { FormValidation, } from "calidation";
import * as noti from "../utils/notification";

const IssueForm = ({ brandId, submitIssue }) => {
    const [allFields, setInput] = useState({
        Title: '',
        Description: '',
        IssueId: '',
        OrderId: '',
    });
    const changeHandler = e => {
        setInput({ ...allFields, [e.target.name]: e.target.value })
    }

    const clearFields = () => {
        setInput({
            Title: '',
            Description: '',
            IssueId: '',
            OrderId: ''
        })
    }

    const formConfig = {
        Title: {
            isRequired: "Title is required",
            isMinLength: {
                message: 'Title must be more than 20 characters',
                length: 20
            }
        },

        Description: {
            isRequired: "Description is required",
            isMinLength: {
                message: 'Description must be more than 30 characters',
                length: 30
            }
        },

        IssueId: {
            isRequired: "Issue type is required",
        },

        OrderId: {},


    }

    return (
        <div className="col-md-12">
            <div className="issue-details">
                <div className="brand-info">
                    <h5>Please share your issue</h5>
                    <FormValidation onSubmit={(f) => { submitIssue(f, brandId); clearFields(); }} config={formConfig}>
                        {({ fields, errors, submitted }) => (
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="text" placeholder="Title" onChange={changeHandler} value={allFields.Title} name="Title" className="form-control" />
                                            {
                                                submitted && errors.Title &&
                                                <div className="error">{errors.Title}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <textarea className="form-control" onChange={changeHandler} value={allFields.Description} name="Description" placeholder="Issue Details" rows={3} defaultValue={""} />
                                            {
                                                submitted && errors.Description &&
                                                <div className="error">{errors.Description}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="text" placeholder="Order ID" onChange={changeHandler} value={allFields.OrderId} name="OrderId" className="form-control" />
                                            {
                                                submitted && errors.OrderId &&
                                                <div className="error">{errors.OrderId}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <select className="form-control" onChange={changeHandler} name="IssueId" value={allFields.IssueId}>
                                                <option>Select your issue</option>
                                                <option value="1">Payment Failure</option>
                                                <option value="2">Order not received</option>
                                            </select>
                                            {
                                                submitted && errors.IssueId &&
                                                <div className="error">{errors.IssueId}</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success">Submit Now</button>
                                </div>
                            </React.Fragment>
                        )}
                    </FormValidation>


                    <p><strong>Raised ticket/s <a href="raised-tickets.html">Check</a></strong></p>
                </div>
            </div>
        </div>
    )
}

class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: []
        }
    }

    componentDidMount = () => {
        loadData(API_URL.BRAND_CONTACT, "").then((ct) => {
            this.setState({
                contacts: ct
            })
        })
    }

    submitIssue = ({ fields, errors, isValid }, brandId) => {
        if (!isValid) return;
        loadData(API_URL.POST_TICKET, "", {
            Title: fields.Title,
            BrandId: brandId,
            Description: fields.Description,
            IssueId: fields.IssueId,
            OrderId: fields.OrderId
        }).then(x => x).then(d => {
            let nt = d.success ? noti.success : noti.warning;
            nt(d.message);
        });
    }

    render() {
        const { contacts } = this.state;
        return (
            <div className="tab-pane active" role="tabpanel">
                <div className="row">
                    {
                        contacts.map((c) => {
                            return (
                                <div className="col-md-12">
                                    <div className="offer-box">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="logo d-inline-block align-bottom">
                                                    <img src={c.brandLogo} alt />
                                                </div>
                                                <div className="content d-inline-block">
                                                    <p>
                                                        <a href="brand-home.html"><strong>{c.brandName}</strong></a>
                                                        {
                                                            c.isVerified &&
                                                            <span className="verified">
                                                                <i className="fa fa-check-circle" />
                                                            </span>
                                                        }

                                                    </p>
                                                    <p>
                                                        21h
            <span>.</span>
                                                        <span><i className="fa fa-globe" /></span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="brand-info">
                                                    <h5>Brand helpline email id</h5>
                                                    <p><a href={"mailto:" + c.email}>{c.email}</a></p>
                                                </div>
                                                <div className="brand-info">
                                                    <h5>Brand helpline contact number</h5>
                                                    <p><a href={"tellto:" + c.contactNumber}>{c.contactNumber}</a></p>
                                                </div>
                                                <div className="brand-info">
                                                    <h5>Brand FAQS</h5>
                                                    <p><a href={c.faqUrl} target="_blank" data-toggle="modal" data-target="#faqPageModal">FAQ Page</a></p>
                                                </div>
                                            </div>

                                            <IssueForm submitIssue={this.submitIssue} brandId={c.brandId} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}

export default Help;