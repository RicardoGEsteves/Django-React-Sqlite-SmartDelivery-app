import React, { Component } from 'react';
import { distance } from '../distanceKm';
import {
    Button,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Container,
    Alert
} from 'reactstrap';

const validDecimalThreePlaces = RegExp(/^[0-9]+(.[0-9]{1,3})?$/);
const validDecimalTwoPlaces = RegExp(/^[0-9]+(.[0-9]{1,2})?$/);
const isValid = ({ formErrors, totalPrice, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false);
    });
    Object.values(rest).forEach(value => {
        value === '' && (valid = false);
    });

    return valid;
};

class Simulator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: '',
            occupiedArea: '',
            deliveryOrigin: '',
            deliveryDestiny: '',
            urgencyRate: '',
            formErrors: {
                weight: '',
                occupiedArea: '',
                deliveryOrigin: '',
                deliveryDestiny: '',
                urgencyRate: ''
            },
            isRequired: false,
            totalPrice: ''
        };
        this.initialState = this.state;
        this.handleTotalResult = this.handleTotalResult.bind(this);
    }

    componentDidMount() {
        distance(this.state);
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'weight':
                formErrors.weight = validDecimalThreePlaces.test(value)
                    ? ''
                    : 'required at least one digit ans max three decimal places';
                break;
            case 'occupiedArea':
                formErrors.occupiedArea = validDecimalTwoPlaces.test(value)
                    ? ''
                    : 'required at least one digit ans max two decimal places';
                break;
            case 'deliveryOrigin':
                formErrors.deliveryOrigin =
                    value.length < 1 ? 'required to select one field' : '';
                break;
            case 'deliveryDestiny':
                formErrors.deliveryDestiny =
                    value.length < 1 ? 'required to select one field' : '';
                break;
            case 'urgencyRate':
                formErrors.urgencyRate =
                    value.length < 1 ? 'required to select one field' : '';
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };
    handleTotalResult = total => {
        console.log(this.state, 'state');
        const {
            urgencyRate,
            occupiedArea,
            deliveryOrigin,
            deliveryDestiny
        } = this.state;
        const eachCm2 = 0.5;
        const eachKm = 0.39;

        let cm2Calc = eachCm2 * parseFloat(occupiedArea);
        let kmCalc = eachKm * distance(deliveryOrigin, deliveryDestiny);
        total = parseInt(urgencyRate) + cm2Calc + kmCalc;
        console.log(total);
        this.setState({ totalPrice: total.toFixed(2) });
        console.log(parseFloat(occupiedArea));
        console.log(occupiedArea);
    };
    handleSubmit = e => {
        e.preventDefault();

        if (isValid(this.state)) {
            console.log('valid', this.state.totalPrice);
            this.handleTotalResult();
            // this.setState(this.initialState);
        } else {
            this.setState({ isRequired: true });
            setTimeout(() => {
                this.setState({ isRequired: false });
            }, 2000);
        }
    };

    render() {
        console.log(this.handleTotalResult);
        console.log('state', this.state);
        const { formErrors } = this.state;
        return (
            <div className='simulator__info'>
                <h1 className='title-header'>Smart Delivery</h1>
                <img
                    className='img-simulator'
                    src='http://www.maths.manchester.ac.uk/media/eps/schoolofmathematics/study/Maths-MMath-banner.jpg'
                    alt='pickedImage'
                />
                <h2 className='title-page'>Simulator</h2>
                <Container>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor='weight'>Weight (kg) </Label>
                                    <Input
                                        type='number'
                                        name='weight'
                                        id='weightId'
                                        placeholder='Weight (kg)'
                                        value={this.state.weight}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <div style={{ color: 'red' }}>
                                        {formErrors.weight.length > 0 && (
                                            <span className='messageError'>
                                                {formErrors.weight}
                                            </span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor='occupiedArea'>
                                        Occupied area (cm2){' '}
                                    </Label>
                                    <Input
                                        type='number'
                                        name='occupiedArea'
                                        id='occupiedAreaId'
                                        placeholder='area (cm2)'
                                        value={this.state.occupiedArea}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <div style={{ color: 'red' }}>
                                        {formErrors.occupiedArea.length > 0 && (
                                            <span className='messageError'>
                                                {formErrors.occupiedArea}
                                            </span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor='deliveryOrigin'>
                                        Delivery Origin District
                                    </Label>
                                    <Input
                                        type='select'
                                        name='deliveryOrigin'
                                        id='deliveryOriginId'
                                        value={this.state.deliveryOrigin}
                                        onChange={e => this.handleChange(e)}
                                    >
                                        <option />
                                        <option>Porto</option>
                                        <option>Coimbra</option>
                                        <option>Lisboa</option>
                                        <option>Évora</option>
                                        <option>Faro</option>
                                    </Input>
                                </FormGroup>
                                {formErrors.deliveryOrigin.length > 0 && (
                                    <span className='messageError'>
                                        {formErrors.deliveryOrigin}
                                    </span>
                                )}
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor='deliveryDestiny'>
                                        Delivery Destiny District
                                    </Label>
                                    <Input
                                        type='select'
                                        name='deliveryDestiny'
                                        id='deliveryDestinyId'
                                        value={this.state.deliveryDestiny}
                                        onChange={e => this.handleChange(e)}
                                    >
                                        <option />
                                        <option>Porto</option>
                                        <option>Coimbra</option>
                                        <option>Lisboa</option>
                                        <option>Évora</option>
                                        <option>Faro</option>
                                    </Input>
                                </FormGroup>
                                {formErrors.deliveryDestiny.length > 0 && (
                                    <span className='messageError'>
                                        {formErrors.deliveryDestiny}
                                    </span>
                                )}
                            </Col>
                        </Row>
                        <FormGroup tag='fieldset'>
                            <legend>Urgency Rate</legend>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type='radio'
                                        name='urgencyRate'
                                        // value={this.state.urgencyRate}
                                        value='10'
                                        onChange={e => this.handleChange(e)}
                                    />{' '}
                                    Until 2 hours = 10€
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type='radio'
                                        name='urgencyRate'
                                        value='5'
                                        onChange={e => this.handleChange(e)}
                                    />{' '}
                                    From 2 hours until 12 hours = 5€
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type='radio'
                                        name='urgencyRate'
                                        value='0'
                                        onChange={e => this.handleChange(e)}
                                    />{' '}
                                    More than 12hours = 0€
                                </Label>
                            </FormGroup>
                            <div style={{ color: 'red' }}>
                                {formErrors.urgencyRate.length > 0 && (
                                    <span className='messageError'>
                                        {formErrors.urgencyRate}
                                    </span>
                                )}
                            </div>
                        </FormGroup>
                        <div className='btn-div'>
                            <Button className='btn-submit' type='submit'>
                                Submit
                            </Button>
                            {this.state.totalPrice !== '' ? (
                                <Alert color='success' className='success'>
                                    This delivery will cost you:{' '}
                                    {this.state.totalPrice} €
                                </Alert>
                            ) : null}
                            {this.state.isRequired ? (
                                <Alert color='danger' className='alert'>
                                    *All form fields are required for simulation
                                </Alert>
                            ) : null}
                        </div>
                    </form>
                </Container>
            </div>
        );
    }
}

export default Simulator;
