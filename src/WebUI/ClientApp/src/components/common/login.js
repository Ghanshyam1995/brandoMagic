import React from 'react';
import { FormValidation } from "calidation";
import { connect } from 'react-redux';
import { UserActions } from "../../actions/userActions";

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(UserActions.login(user)),
        toggleLoginPopup: () => dispatch(UserActions.toggleLoginScreen()),
        addProfile: (user) => dispatch(UserActions.addProfile(user))
    }
}

const mapStateToProps = (state) => {
    return { showLoginPage: state.user && state.user.showLoginPage };
};

class Login extends React.Component {
    constructor(props) {
        super(props);
    }


    login = ({ fields, errors, isValid }) => {
        if (isValid) {
            this.props.login(fields);
        }
    };

    signup = ({ fields, errors, isValid }) => {
        if (isValid) this.props.addProfile(fields);
    }

    render() {
        const { showLoginPage, toggleLoginPopup } = this.props;
        const loginValidationConfig = {
            userName: {
                isRequired: "Username is required"
            },
            password: {
                isRequired: "Password field required!"
            }
        };

        const signUpValidationConfig = {
            userName: {
                isRequired: "Username is required",
                isMinLength: {
                    message: 'Username must be more than 6 characters',
                    length: 6
                },
            },
            password: {
                isRequired: "Password is required!",
                isMinLength: {
                    message: 'Password must be more than 6 characters',
                    length: 6
                }
            },
            firstName: {
                isRequired: "First Name is required!"
            },
            lastName: {
                isRequired: "Last Name is required!"
            },
            email: {
                isRequired: "Email is required!",
                isEmail: 'Email is not valid'
            },
            confirmPassword: {
                isRequired: 'Repeat Password is required',
                isEqual: ({ fields }) => ({
                    message: 'Password do not match',
                    value: fields.password,
                    validateIf: fields.password.length > 0, // this can be a boolean too!
                })
            }
        }

        return (
            <div className={"modal " + (showLoginPage ? "show" : "")} id="loginModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={toggleLoginPopup}>×</button>
                        </div>
                        <div className="modal-body" style={{ overflowY: 'auto' }}>
                            <div className="login-wrap">
                                <div className="login-html">

                                    <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Login</label>
                                    <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">Sign Up</label>
                                    <div className="login-form">
                                        <FormValidation onSubmit={this.login} config={loginValidationConfig}>
                                            {({ fields, errors, submitted }) => (
                                                <div className="sign-in-htm">
                                                    <div className="group">
                                                        <label htmlFor="userName" className="label">Username</label>
                                                        <input id="userName" name="userName" value={fields.userName} type="text" className="input" />
                                                        {submitted && errors.userName &&
                                                            <div className="error">{errors.userName}</div>
                                                        }
                                                    </div>
                                                    <div className="group">
                                                        <label htmlFor="password" className="label">Password</label>
                                                        <input id="password" type="password" name="password" value={fields.password} className="input" data-type="password" />
                                                        {submitted && errors.password &&
                                                            <div className="error">{errors.password}</div>
                                                        }
                                                    </div>
                                                    <div className="group">
                                                        <input id="check" type="checkbox" className="check" defaultChecked />
                                                        <label htmlFor="check"><span className="icon" /> Keep me Signed in</label>
                                                    </div>
                                                    <div className="group">
                                                        <input type="submit" className="button" defaultValue="Sign In" />
                                                    </div>
                                                    <div className="hr" />
                                                    <div className="foot-lnk">
                                                        <a>Forgot Password?</a>
                                                    </div>
                                                </div>

                                            )}
                                        </FormValidation>
                                        <FormValidation onSubmit={this.signup} config={signUpValidationConfig}>
                                            {({ fields, errors, submitted }) => (
                                                <div className="sign-up-htm">
                                                    <div className="group">
                                                        <label htmlFor="user" className="label">Firstname</label>
                                                        <input id="firstname" value={fields.firstName} name="firstName" type="text" className="input" />
                                                        {
                                                            submitted && errors.firstName &&
                                                            <div className="error">{errors.firstName}</div>
                                                        }
                                                    </div>
                                                    <div className="group">
                                                        <label htmlFor="user" className="label">Lastname</label>
                                                        <input id="firstname" value={fields.lastName} name="lastName" type="text" className="input" />
                                                        {
                                                            submitted && errors.lastName &&
                                                            <div className="error">{errors.lastName}</div>
                                                        }
                                                    </div>
                                                    <div className="group">
                                                        <label htmlFor="user" className="label">Username</label>
                                                        <input id="user" value={fields.userName} name="userName" type="text" className="input" />
                                                        {
                                                            submitted && errors.userName &&
                                                            <div className="error">{errors.userName}</div>
                                                        }
                                                    </div>
                                                    <div className="group">
                                                        <label htmlFor="pass" className="label">Password</label>
                                                        <input id="pass" value={fields.password} name="password" type="password" className="input" data-type="password" />
                                                        {
                                                            submitted && errors.password &&
                                                            <div className="error">{errors.password}</div>
                                                        }
                                                    </div>
                                                    <div className="group">
                                                        <label htmlFor="pass" className="label">Repeat Password</label>
                                                        <input id="pass" value={fields.confirmPassword} name="confirmPassword" type="password" className="input" data-type="password" />
                                                        {
                                                            submitted && errors.confirmPassword &&
                                                            <div className="error">{errors.confirmPassword}</div>
                                                        }
                                                    </div>
                                                    <div className="group">
                                                        <label htmlFor="pass" className="label">Email Address</label>
                                                        <input id="pass" value={fields.email} name="email" type="text" className="input" />
                                                        {
                                                            submitted && errors.email &&
                                                            <div className="error">{errors.email}</div>
                                                        }
                                                    </div>
                                                    <div className="group">
                                                        <input type="submit" className="button" defaultValue="Sign Up" />
                                                    </div>
                                                    <div className="hr" />
                                                    <div className="foot-lnk">
                                                        <label htmlFor="tab-1">Already Member?</label></div>
                                                </div>
                                            )}
                                        </FormValidation>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);