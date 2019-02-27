import React from 'react';
import axios from 'axios';
import { fetchUsers } from '../api/index';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    Input,
    Col,
    Row
} from 'reactstrap';

const validEmail = RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gim
);
const validZipCode = RegExp(/^\d{4}(?:[-\s]\d{3})?$/);

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
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            contact: '',
            username: '',
            email: '',
            password: '',
            address: '',
            district: '',
            locality: '',
            zipcode: '',
            formErrors: {
                firstName: '',
                lastName: '',
                contact: '',
                username: '',
                email: '',
                password: '',
                address: '',
                district: '',
                locality: '',
                zipcode: ''
            },
            isRequired: false,
            users: [],
            userAlreadyExist: false,
            userCreated: false
        };

        this.toggle = this.toggle.bind(this);
        this.initialState = this.state;
    }

    // componentDidMount() {
    //     axios
    //         .get('http://127.0.0.1:8000/api/Users')
    //         .then(res => {
    //             this.setState({
    //                 users: res.data
    //             });
    //         })
    //         .catch(err => console.log(err));
    // }

    getUsers = async () => {
        const users = await fetchUsers();
        this.setState({ users });
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'firstName':
                formErrors.firstName =
                    value.length < 2 ? 'required more then 2 characters' : '';
                break;
            case 'lastName':
                formErrors.lastName =
                    value.length < 2 ? 'required more then 2 characters' : '';
                break;
            case 'contact':
                formErrors.contact =
                    value.length < 9 ? 'required more then 9 characters' : '';
                break;
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
            case 'address':
                formErrors.address =
                    value.length < 9 ? 'required more then 9 characters' : '';
                break;
            case 'district':
                formErrors.district =
                    value.length < 4 ? 'required more then 4 characters' : '';
                break;
            case 'locality':
                formErrors.locality =
                    value.length < 4 ? 'required more then 4 characters' : '';
                break;
            case 'zipcode':
                formErrors.zipcode = validZipCode.test(value)
                    ? ''
                    : 'required this type: ****-***';
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            users,
            firstName,
            lastName,
            contact,
            username,
            email,
            password,
            address,
            district,
            locality,
            zipcode
        } = this.state;
        console.log('submitting');
        if (isValid(this.state)) {
            let canCreateUser = false;
            console.log('isValid');
            users.forEach(user => {
                console.log('looping');
                if (username === user.username || email === user.email) {
                    this.setState({ userAlreadyExist: true });
                    console.log(user, user.username);
                    setTimeout(() => {
                        this.setState({ userAlreadyExist: false });
                    }, 2000);
                    canCreateUser = false;
                } else {
                    console.log('user dont exist');
                    canCreateUser = true;
                }
            });
            if (canCreateUser === true) {
                console.log('post done');
                axios
                    .post('http://127.0.0.1:8000/api/Users/', {
                        firstName: firstName,
                        lastName: lastName,
                        contact: contact,
                        username: username,
                        email: email,
                        password: password,
                        address: address,
                        district: district,
                        locality: locality,
                        zipcode: zipcode
                    })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
                this.setState({ userCreated: true });
                setTimeout(() => {
                    this.toggle();
                    this.setState(this.initialState); //{ userCreated: false }
                }, 2000);
            }
        } else {
            console.log('is not valid');
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
        console.log(this.state);
        console.log('state', this.state.users);
        const { formErrors } = this.state;
        return (
            <div>
                <Button color='danger' onClick={this.handleOnClick}>
                    Register
                </Button>
                {/* this.toggle */}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader toggle={this.toggle}>
                            Register{' '}
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col xs='6' sm='4'>
                                    <Label>First Name</Label>
                                    <Input
                                        type='text'
                                        name='firstName'
                                        id='firstNameId'
                                        placeholder='First Name'
                                        value={this.state.name}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <div style={{ color: 'red' }}>
                                        {formErrors.firstName.length > 0 && (
                                            <span className='errorMessage'>
                                                {formErrors.firstName}
                                            </span>
                                        )}
                                    </div>
                                </Col>
                                <Col xs='6' sm='4'>
                                    <Label>Last Name</Label>
                                    <Input
                                        type='text'
                                        name='lastName'
                                        id='lastNameId'
                                        placeholder='Last Name'
                                        value={this.state.name}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <div style={{ color: 'red' }}>
                                        {formErrors.lastName.length > 0 && (
                                            <span className='errorMessage'>
                                                {formErrors.lastName}
                                            </span>
                                        )}
                                    </div>
                                </Col>
                                <Col sm='4'>
                                    <Label>Contact</Label>
                                    <Input
                                        type='number'
                                        name='contact'
                                        id='contactId'
                                        placeholder='Contact'
                                        value={this.state.name}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <div style={{ color: 'red' }}>
                                        {formErrors.contact.length > 0 && (
                                            <span className='errorMessage'>
                                                {formErrors.contact}
                                            </span>
                                        )}
                                    </div>
                                </Col>
                            </Row>

                            <Label>Username</Label>
                            <Input
                                type='text'
                                name='username'
                                id='userNameId'
                                placeholder='Username'
                                value={this.state.name}
                                onChange={e => this.handleChange(e)}
                            />
                            <div style={{ color: 'red' }}>
                                {formErrors.username.length > 0 && (
                                    <span className='errorMessage'>
                                        {formErrors.username}
                                    </span>
                                )}
                            </div>
                            <Label>Email</Label>
                            <Input
                                type='email'
                                name='email'
                                id='emailId'
                                placeholder='Email'
                                value={this.state.email}
                                onChange={e => this.handleChange(e)}
                            />

                            <div style={{ color: 'red' }}>
                                {formErrors.email.length > 0 && (
                                    <span className='errorMessage'>
                                        {formErrors.email}
                                    </span>
                                )}
                            </div>
                            <Label>Password</Label>
                            <Input
                                type='password'
                                name='password'
                                id='passwordId'
                                placeholder='Password'
                                value={this.state.password}
                                onChange={e => this.handleChange(e)}
                            />
                            <div style={{ color: 'red' }}>
                                {formErrors.password.length > 0 && (
                                    <span className='errorMessage'>
                                        {formErrors.password}
                                    </span>
                                )}
                            </div>
                            <Label>Address</Label>
                            <Input
                                type='text'
                                name='address'
                                id='addressId'
                                placeholder='Address'
                                value={this.state.name}
                                onChange={e => this.handleChange(e)}
                            />
                            <div style={{ color: 'red' }}>
                                {formErrors.address.length > 0 && (
                                    <span className='errorMessage'>
                                        {formErrors.address}
                                    </span>
                                )}
                            </div>

                            <Row>
                                <Col xs='6' sm='4'>
                                    <Label>District</Label>
                                    <Input
                                        type='text'
                                        name='district'
                                        id='districtId'
                                        placeholder='District'
                                        value={this.state.name}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <div style={{ color: 'red' }}>
                                        {formErrors.district.length > 0 && (
                                            <span className='errorMessage'>
                                                {formErrors.district}
                                            </span>
                                        )}
                                    </div>
                                </Col>
                                <Col xs='6' sm='4'>
                                    <Label>Locality</Label>
                                    <Input
                                        type='text'
                                        name='locality'
                                        id='localityId'
                                        placeholder='Locality'
                                        value={this.state.name}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <div style={{ color: 'red' }}>
                                        {formErrors.locality.length > 0 && (
                                            <span className='errorMessage'>
                                                {formErrors.locality}
                                            </span>
                                        )}
                                    </div>
                                </Col>
                                <Col xs='6' sm='4'>
                                    <Label>Zip code</Label>
                                    <Input
                                        type='text'
                                        pattern='[0-9]{4}-[0-9]{3}'
                                        name='zipcode'
                                        id='zipcodeId'
                                        placeholder='Zip-code'
                                        value={this.state.name}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <div style={{ color: 'red' }}>
                                        {formErrors.zipcode.length > 0 && (
                                            <span className='errorMessage'>
                                                {formErrors.zipcode}
                                            </span>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button type='submit' color='primary'>
                                Register
                            </Button>
                        </ModalFooter>
                        {this.state.userAlreadyExist && (
                            <p className='errorMessage'>
                                username or email already exist
                            </p>
                        )}
                        {this.state.isRequired ? (
                            <p className='alert-login'>
                                All form fields are required to create account
                            </p>
                        ) : null}
                        {this.state.userCreated && (
                            <p className='success-register'>
                                User created with success
                            </p>
                        )}
                    </form>
                </Modal>
            </div>
        );
    }
}

export default Register;
