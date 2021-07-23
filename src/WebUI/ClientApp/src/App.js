/*global google*/
import React from 'react';
import Home from "./views/home";
import UserDashboard from "./views/userDashboard";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt from 'jwt-decode';
import Login from "./components/common/login"
import ReactNotification from 'react-notifications-component';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
const mapStateToProps = (state) => {
    return { isLoggedIn: state.user && state.user.isLoggedIn };
};

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        google.accounts.id.initialize({
            client_id: '959763122850-n94keg14bqur0fn2a0tlqsl27ks5he3g.apps.googleusercontent.com',
            callback: this.onGoogleOneTap
        });

        google.accounts.id.prompt(notification => {

        })
    }


    onGoogleOneTap = response => {
        //const decodedToken = jwt(response.credential);
    }

    // getPathDepth = (location)

    render() {
        const { isLoggedIn, location } = this.props;
        //const timeout = { enter: 1000, exit: 400 };
        return (
            <React.Fragment>
                <ReactNotification />
                <BrowserRouter>
                    <LoadingBar />
                    <Header />
                    {/*<TransitionGroup component="div">*/}
                    {/*    <CSSTransition timeout={timeout} className="pageSlider" mountOnEnter={false} unmountOnExit={true}>*/}
                    <Switch>
                        <Route exact path="/" >
                            <Home />
                        </Route>
                        <Route path="/user-dashboard">
                            <UserDashboard />
                        </Route>
                    </Switch>
                    {/*    </CSSTransition>*/}
                    {/*</TransitionGroup>*/}
                </BrowserRouter>
                <Footer />
                { !isLoggedIn && <Login />}
            </React.Fragment>
        );
    }
}



export default connect(mapStateToProps)(App);