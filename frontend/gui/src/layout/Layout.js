import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import { Button, Row } from 'reactstrap';
import Login from '../components/Login';
import Register from '../components/Register';
import Content from '../components/Content';
import Footer from '../components/Footer';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.state = {
            // displayLogin: false,
            // displayRegister: false,
            isLoggedIn: false,
            userDetails: {
                id: '',
                username: '',
                email: ''
            }
        };
    }

    // componentDidMount() {}
    // componentWillUnmount() {}

    // displayLoginForm = () => {
    //     this.setState({ displayLogin: !this.state.displayLogin });
    // };
    // displayRegisterForm = () => {
    //     this.setState({ displayRegister: !this.state.displayRegister });
    // };

    isLoggedIn = () => {
        this.setState({ isLoggedIn: true });
    };

    userDetails = (id, username, email) => {
        let userDetails = { ...this.state.userDetails, id, username, email };
        this.setState({ userDetails: userDetails });
    };

    handleLogout = () => {
        this.setState({ isLoggedIn: !this.state.isLoggedIn });
    };
    render() {
        // const { email, username } = this.state.userDetails;
        return (
            <div id='layout__wrapper'>
                <Navigation
                    pageWrapId={'page-wrap'}
                    outerContainerId={'layout__wrapper'}
                    loggedUser={this.state.userDetails}
                />
                <div id='page-wrap'>
                    <div className='header__wrapper'>
                        {!this.state.isLoggedIn ? (
                            <React.Fragment>
                                {/* <Button onClick={() => this.displayLoginForm()}>
                                    Login
                                </Button>
                                {this.state.displayLogin && <Login />}
                                <Button
                                    onClick={() => this.displayRegisterForm()}
                                >
                                    Register
                                </Button>
                                {this.state.displayRegister && <Register />} */}
                                <div className='div-login'>
                                    <Row className='row-btn-register-login'>
                                        <Login
                                            isLoggedIn={this.isLoggedIn}
                                            userDetails={this.userDetails}
                                        />

                                        <Register />
                                    </Row>
                                </div>
                            </React.Fragment>
                        ) : (
                            <div className='div-userLoggedIn'>
                                <Row className='row-userLoggedIn'>
                                    <p className='welcomeUser'>
                                        Welcome,{' '}
                                        {this.state.userDetails.username}
                                    </p>
                                    <Button
                                        className='btn-logout'
                                        type='button'
                                        onClick={() => this.handleLogout()}
                                    >
                                        Logout
                                    </Button>
                                </Row>
                            </div>
                        )}
                    </div>
                    <Content
                        className='page__content'
                        {...this.state.userDetails}
                    />
                </div>
                <Footer />
            </div>
        );
    }
}
