import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    return (
        <div className="col-sm-12 col-md-6 col-lg-8 d-flex">
            <div className="login-container">              
                <form 
                    name="loginForm" 
                    id="loginForm" 
                    method="post" 
                    action="/idp/profile/SAML2/Redirect/SSO?execution=e1s2"
                >
                    <div className="loginBox">
                        <h1 className="page-title">SWBC Login</h1>
                        <input 
                            name="__RequestVerificationToken" 
                            type="hidden" 
                        />
                        <label htmlFor="myUTSAID" className="login__label">
                            <strong>Username:</strong>
                        </label>
                        <div className="input-group flex-nowrap">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </span>
                            </div>
                            <input 
                                className="form-control" 
                                type="text" 
                                id="username" 
                                name="j_username" 
                                placeholder="Username" 
                            />
                        </div>
                        <label htmlFor="passphrase" className="login__label">
                            <strong>Password:</strong>
                        </label>
                        <div className="input-group flex-nowrap">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                            <input 
                                className="form-control" 
                                type="password" 
                                id="password" 
                                name="j_password" 
                                placeholder="Password" 
                                autoComplete="off" 
                            />
                        </div>
                        <div className="checkbox form-group" id="rememberBox">
                            <label>
                                <input 
                                    name="rememberMe" 
                                    id="rememberMe" 
                                    type="checkbox" 
                                    value="true" 
                                /> 
                                <small><strong>Remember Me</strong></small>
                            </label>
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit" 
                                name="_eventId_proceed" 
                                id="submit" 
                                className="btn btn-lg btn-primary w-100" 
                                value="Log In" 
                            />
                        </div>
                    </div>
                </form>

                <div className="bottom-wrapper">
                    <div className="help-section">
                        <ul>
                            <li><i className="fas fa-question-circle"></i></li>
                            <li><a href="https://passphrase.utsa.edu/">Forgot your password</a></li>
                            <li><a href="https://utsa.edu/techsolutions/techcafe/">Need help?</a></li>
                        </ul>
                    </div>
                    <div className="grey">
                        <p>
                            <strong>
                                For security reasons, please exit your Web browser and/or log out completely when you are done accessing services that require authentication, especially if you are using a public computer or kiosk.
                            </strong>
                        </p>
                        <p>
                            <a href="https://files.constantcontact.com/730e4b12101/ce8f93fb-f69c-48e5-9cfd-6dc551126f3e.pdf" target="_blank" rel="noopener noreferrer">
                                Acceptable Use Policy
                            </a>
                        </p>
                        <p>
                            This computer application is the property of SWBC.
                            Improper or unauthorized use of this application may lead to criminal prosecution
                            or other disciplinary action. Use of this application, authorized or unauthorized,
                            constitutes consent to monitoring of the system and the user’s acknowledgement of
                            accountability and responsibility.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
