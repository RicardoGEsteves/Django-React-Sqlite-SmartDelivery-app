import React, { Component } from 'react';
import axios from 'axios';

import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            isMessageSend: false
        };
        this.initialState = this.state;
    }

    handleChange = e => {
        const { name, value } = e.target;
        e.preventDefault();
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        const { name, email, message, isMessageSend } = this.state;
        e.preventDefault();
        axios
            .post('http://127.0.0.1:8000/api/WebsiteContacts/', {
                name: name,
                email: email,
                message: message
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        this.setState({ isMessageSend: true });
        if (!isMessageSend) {
            setTimeout(() => {
                this.setState(this.initialState);
            }, 3000);
        }
    };
    render() {
        console.log(this.state);
        return (
            <div>
                <h1 className='title-header'>Smart Delivery</h1>
                <img
                    className='contact-img'
                    src='http://www.bobethu.org.za/wp-content/uploads/2017/01/banner-contact-us.jpg'
                    alt='banner'
                />
                <Container>
                    <div>
                        <h2 className='title-pageh2'>Contacts</h2>
                    </div>
                </Container>
                <Container className='container-contacts'>
                    <Row>
                        <Col xs='6'>
                            <img
                                className='contact-map'
                                src='https://i.ibb.co/R4JLvbR/mapa.png'
                                alt='mapa'
                                border='0'
                                width='80%'
                            />
                        </Col>
                        <Col xs='6'>
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <p className='contact-us-p'>
                                    Please contact us if you have any questions
                                </p>
                                <FormGroup>
                                    <Label for='name'>Name</Label>
                                    <Input
                                        type='text'
                                        name='name'
                                        placeholder='your name'
                                        value={this.state.name}
                                        onChange={e => this.handleChange(e)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='exampleEmail'>Email</Label>
                                    <Input
                                        type='email'
                                        name='email'
                                        placeholder='email@email.com'
                                        value={this.state.email}
                                        onChange={e => this.handleChange(e)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='exampleText'>
                                        Your message
                                    </Label>
                                    <Input
                                        type='textarea'
                                        name='message'
                                        placeholder='your-message'
                                        value={this.state.message}
                                        onChange={e => this.handleChange(e)}
                                    />
                                </FormGroup>
                                <Button className='btn-send' type='submit'>
                                    {' '}
                                    Send message{' '}
                                </Button>
                                {this.state.isMessageSend ? (
                                    <p>Message send with success</p>
                                ) : null}
                            </Form>
                        </Col>
                    </Row>

                    <div className='div-email'>
                        <h2>
                            <a href='mailto:info@smartdelivery.com'>
                                {' '}
                                info@smartdelivery.com{' '}
                            </a>
                        </h2>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Contacts;
