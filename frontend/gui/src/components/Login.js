import React from 'react';
import { fetchUsers } from '../api/index';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    Input
} from 'reactstrap';

const validEmail = RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gim
);
const isValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false);
    });
    Object.values(rest).forEach(value => {
        value === '' && (valid = false);
    });

    return valid;
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            formErrors: {
                username: '',
                email: '',
                password: ''
            },
            isRequired: false,
            userNotFound: false,
            users: []
        };

        this.toggle = this.toggle.bind(this);
        this.initialState = this.state;
    }

    // async componentDidMount() {
    //
    //     // const users = fetchUsers();
    //     // this.setState({ users: users });

    //     const users = await getUsers();
    //     this.setState({ users });

    //     // axios
    //     //     .get('http://127.0.0.1:8000/api/Users')
    //     //     .then(res => {
    //     //         this.setState({
    //     //             users: res.data
    //     //         });
    //     //     })
    //     //     .catch(err => console.log(err));
    // }

    getUsers = async () => {
        const users = await fetchUsers();
        this.setState({ users });
    };
    handleChange = e => {
        console.log(this.state);
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'username':
                formErrors.username =
                    value.length < 4 ? 'required more then 4 characters' : '';
                break;
            case 'email':
                formErrors.email = validEmail.test(value)
                    ? ''
                    : 'invalid email address';
                break;
            case 'password':
                formErrors.password =
                    value.length < 6 ? 'required more then 6 characters' : '';
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };

    handleSubmit = e => {
        const isLoggedIn = this.props.isLoggedIn;
        const { users, username, email, password } = this.state;
        e.preventDefault();
        if (isValid(this.state)) {
            users.forEach(user => {
                if (
                    username === user.username &&
                    email === user.email &&
                    password === user.password
                ) {
                    isLoggedIn();
                    this.props.userDetails(user.id, user.username, user.email);
                    this.toggle();
                    this.setState(this.initialState);
                } else {
                    this.setState({ userNotFound: true });
                    setTimeout(() => {
                        this.setState({ userNotFound: false });
                    }, 2000);
                }
            });
        } else {
            this.setState({ isRequired: true });
            setTimeout(() => {
                this.setState({ isRequired: false });
            }, 2000);
        }
    };

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleOnClick = () => {
        this.toggle();
        this.getUsers();
    };

    render() {
        console.log('state', this.state.users);
        const { formErrors } = this.state;
        return (
            <div>
                <Button color='danger' onClick={this.handleOnClick}>
                    Login
                </Button>
                {/* this.toggle */}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <ModalHeader toggle={this.toggle}>Login </ModalHeader>
                        <ModalBody>
                            <div>
                                <Label>Username</Label>
                                <Input
                                    type='text'
                                    name='username'
                                    id='usernameLoginId'
                                    placeholder='Username'
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                />

                                {/* {this.state.userNotFound ? (
                                    <p
                                        className='errorMessage'
                                    >
                                        username doesn't exist
                                    </p>
                                ) : null} */}
                                {formErrors.username.length > 0 && (
                                    <span className='errorMessage'>
                                        {formErrors.username}
                                    </span>
                                )}
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='emailLoginId'
                                    placeholder='Email'
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                />
                                {formErrors.email.length > 0 && (
                                    <span className='errorMessage'>
                                        {formErrors.email}
                                    </span>
                                )}
                                <div />
                                <Label>Password</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                    id='passwordLoginId'
                                    placeholder='Password'
                                />
                                {formErrors.password.length > 0 && (
                                    <span className='errorMessage'>
                                        {formErrors.password}
                                    </span>
                                )}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type='submit'
                                color='primary'
                                // onClick={() => this.props.isLoggedIn}
                            >
                                Login
                            </Button>
                        </ModalFooter>
                        {this.state.userNotFound && (
                            <p className='alert-login'>Wrong user details</p>
                        )}
                        {this.state.isRequired ? (
                            <p className='alert-login'>
                                {' '}
                                *All form fields are required for login{' '}
                            </p>
                        ) : null}
                    </form>
                </Modal>
            </div>
        );
    }
}

export default Login;
