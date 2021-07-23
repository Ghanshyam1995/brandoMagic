import React, { Component } from "react";
import { connect } from 'react-redux';
import Autocomplete from "../common/autoComplete";
import { UserActions } from "../../actions/userActions";
import { NavLink } from "react-router-dom";
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(UserActions.logout()),
        toggleLoginPopup: () => dispatch(UserActions.toggleLoginScreen())
    }
}
const mapStateToProps = (state) => {
    return { isLoggedIn: state.user && state.user.isLoggedIn };
};

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isLoggedIn, logout, toggleLoginPopup } = this.props;
        return (
            <header>
                <div id="header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-1">
                                <div className="header-logo">
                                    <NavLink className="logo" to="/">
                                        <img src="./img/logo.png" className="img-responsive" alt="" />
                                    </NavLink>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="header-search">
                                    <Autocomplete/>
                                </div>
                            </div>
                            <div className="col-md-6 clearfix">
                                <div className="header-ctn">
                                    <nav id="navigation">
                                        <div id="responsive-nav">
                                            <ul className="main-nav nav navbar-nav">
                                                <li><NavLink activeClassName="is-active" to="/">Home</NavLink></li>
                                                <li><a href="#">Help</a></li>
                                                <li><a href="#">Contest</a></li>
                                                <li><a href="#">Offers</a></li>
                                                <li><a href="#">Discussion</a></li>
                                                <li><a href="#">Media</a></li>
                                            </ul>
                                            {
                                                !isLoggedIn &&
                                                <div className="btn-container">
                                                    <a href={() => "void(0)"} onClick={toggleLoginPopup} className="btn btn-3">Login</a>
                                                </div>
                                            }

                                            {isLoggedIn &&
                                                <div className="btn-container">
                                                    <a href={void (0)} onClick={logout} className="btn btn-3">Logout</a>
                                                </div>}



                                        </div>
                                    </nav>
                                    <div className="menu-toggle">
                                        <a href="#">
                                            <i className="fa fa-bars" />
                                            <span>Menu</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);