import React, { Component } from 'react';
import axios from 'axios';
import { distance } from '../distanceKm';
import {
    Button,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Alert
} from 'reactstrap';

// const validFile = RegExp(/^\w+\.(gif|png|jpg|jpeg)$/);
const validDecimalThreePlaces = RegExp(/^[0-9]+(.[0-9]{1,3})?$/);
const validDecimalTwoPlaces = RegExp(/^[0-9]+(.[0-9]{1,2})?$/);
const validDate = RegExp(
    /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
    // /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
);
const validTime = RegExp(
    // /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/
    /^([01]?[0-9]|2[0-3]):[0-5][0-9]/
    // /\b(1[0-2]|0?[0-9]):([0-5][0-9])/
    // /\b(1[0-2]|0?[0-9]):([0-5][0-9]):([0-5][0-9])/
    // /\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/
);
const validQuantity = RegExp(/^\d$|^([1][0-9]|20)$/);

const isValid = ({
    formErrors,
    userID,
    truckID,
    totalPrice,
    itemImage,
    ...rest
}) => {
    let valid = true;

    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false);
    });
    Object.values(rest).forEach(value => {
        value === '' && (valid = false);
    });

    return valid;
};

class Delivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.location.state.userID,
            truckID: 1,
            itemName: '',
            itemDescription: '',
            itemWeight: '',
            occupiedArea: '',
            urgencyRate: '',
            itemImage: '',
            itemCategory: '',
            deliveryDate: '',
            deliveryHour: '',
            itemQuantity: '',
            totalPrice: '',
            deliveryOrigin: '',
            deliveryDestiny: '',
            deliveryReceiver: '',
            deliveryAddress: '',
            paymentMethod: '',
            formErrors: {
                itemName: '',
                itemDescription: '',
                itemWeight: '',
                occupiedArea: '',
                urgencyRate: '',
                itemImage: '',
                itemCategory: '',
                deliveryDate: '',
                deliveryHour: '',
                itemQuantity: '',
                deliveryOrigin: '',
                deliveryDestiny: '',
                deliveryReceiver: '',
                deliveryAddress: '',
                paymentMethod: ''
            },
            isRequired: false,
            deliveryCreated: false
        };

        this.initialState = this.state;
        this.handleTotalResult = this.handleTotalResult.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        distance(this.state);
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'itemName':
                formErrors.itemName =
                    value.length < 1 ? 'required more then 1 characters' : '';
                break;
            case 'itemDescription':
                formErrors.itemDescription =
                    value.length < 5 ? 'required more then 5 characters' : '';
                break;
            case 'itemWeight':
                formErrors.itemWeight = validDecimalThreePlaces.test(value)
                    ? ''
                    : 'required at least one digit ans max three decimal places';
                break;
            case 'occupiedArea':
                formErrors.occupiedArea = validDecimalTwoPlaces.test(value)
                    ? ''
                    : 'required at least one digit ans max two decimal places';
                break;
            // case 'itemImage':
            //     formErrors.itemImage = validFile.test(value)
            //         ? ''
            //         : 'required this files type .gif/.png/.jpg/.jpeg';
            //     break;
            case 'itemCategory':
                formErrors.itemCategory =
                    value.length < 1 ? 'required to select one category' : '';
                break;
            case 'deliveryDate':
                formErrors.deliveryDate = validDate.test(value)
                    ? ''
                    : 'required this format dd/mm/yyyy';
                break;
            case 'deliveryHour':
                formErrors.deliveryHour = validTime.test(value)
                    ? ''
                    : 'required this format hh:mm AM/PM';
                break;
            case 'itemQuantity':
                formErrors.itemQuantity = validQuantity.test(value)
                    ? ''
                    : 'required 1 item and max quantity per delivery is 20 items';
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
            case 'deliveryReceiver':
                formErrors.deliveryReceiver =
                    value.length < 1
                        ? 'required more at least 1 characters'
                        : '';
                break;
            case 'deliveryAddress':
                formErrors.deliveryAddress =
                    value.length < 8
                        ? 'required more at least 8 characters'
                        : '';
                break;
            case 'paymentMethod':
                formErrors.paymentMethod =
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
            deliveryDestiny,
            itemQuantity
        } = this.state;
        const eachCm2 = 0.5;
        const eachKm = 0.39;

        let cm2Calc =
            eachCm2 * parseFloat(occupiedArea) * parseInt(itemQuantity);
        let kmCalc = eachKm * distance(deliveryOrigin, deliveryDestiny);
        total = parseInt(urgencyRate) + cm2Calc + kmCalc;
        console.log(total);

        this.setState({
            totalPrice: total.toFixed(2)
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        if (isValid(this.state)) {
            this.handleTotalResult();
            this.toggle();
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

    confirmDelivery = e => {
        e.preventDefault();

        const {
            userID,
            truckID,
            itemName,
            itemDescription,
            itemWeight,
            occupiedArea,
            urgencyRate,
            // itemImage,
            itemCategory,
            deliveryDate,
            deliveryHour,
            itemQuantity,
            totalPrice,
            deliveryOrigin,
            deliveryDestiny,
            deliveryReceiver,
            deliveryAddress,
            paymentMethod
        } = this.state;

        // const parsedItemWeight = parseFloat(itemWeight);
        // const parsedOccupiedArea = parseFloat(occupiedArea);
        const parsedUrgencyRate = parseInt(urgencyRate);
        const parsedItemQuantity = parseInt(itemQuantity);
        // const parsedTotalPrice = parseFloat(totalPrice);

        axios
            .post('http://127.0.0.1:8000/api/Deliveries/', {
                userID: userID,
                truckID: truckID,
                itemName: itemName,
                itemDescription: itemDescription,
                itemWeight: itemWeight,
                occupiedArea: occupiedArea,
                urgencyRate: parsedUrgencyRate,
                // itemImage: itemImage,
                itemCategory: itemCategory,
                deliveryDate: deliveryDate,
                deliveryHour: deliveryHour,
                itemQuantity: parsedItemQuantity,
                totalPrice: totalPrice,
                deliveryOrigin: deliveryOrigin,
                deliveryDestiny: deliveryDestiny,
                deliveryReceiver: deliveryReceiver,
                deliveryAddress: deliveryAddress,
                paymentMethod: paymentMethod
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        this.setState({ deliveryCreated: true });
        setTimeout(() => {
            this.toggle();
            this.setState(this.initialState);
        }, 3000);
    };
    render() {
        // console.log('props', this.props.location.state);
        console.log(this.state);
        const { formErrors } = this.state;
        return (
            <div>
                <h1 className='title-header'>Smart Delivery</h1>
                <img
                    className='delivery-img'
                    src='https://www.morphyrichards.co.uk/admin/Images/Editor/Support/support-delivery.jpg'
                    alt='pickedImage'
                />
                <section className='section-delivery'>
                    <Container>
                        <h2 className='title-page'> Create your delivery </h2>
                        <div className='productInfo'>
                            <form onSubmit={e => this.handleSubmit(e)}>
                                <Row>
                                    <Col xs='6' sm='4'>
                                        <FormGroup>
                                            <Label htmlFor='itemName'>
                                                Product name{' '}
                                            </Label>
                                            <Input
                                                type='text'
                                                name='itemName'
                                                id='itemNameId'
                                                value={this.state.itemName}
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                placeholder='Product name'
                                            />
                                        </FormGroup>
                                        {formErrors.itemName.length > 0 && (
                                            <span className=''>
                                                {formErrors.itemName}
                                            </span>
                                        )}
                                    </Col>
                                    <Col xs='6' sm='4'>
                                        <FormGroup>
                                            <Label htmlFor='itemQuantity'>
                                                {' '}
                                                Quantity{' '}
                                            </Label>
                                            <Input
                                                type='number'
                                                name='itemQuantity'
                                                id='itemQuantityId'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value={this.state.itemQuantity}
                                                placeholder='Min 1 and max 20'
                                            />
                                        </FormGroup>
                                        {formErrors.itemQuantity.length > 0 && (
                                            <span className=''>
                                                {formErrors.itemQuantity}
                                            </span>
                                        )}
                                    </Col>
                                    <Col sm='4'>
                                        <FormGroup>
                                            <Label htmlFor='itemCategory'>
                                                Category
                                            </Label>
                                            <Input
                                                type='select'
                                                name='itemCategory'
                                                id='itemCategoryId'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value={this.state.itemCategory}
                                            >
                                                <option />
                                                <option>Food</option>
                                                <option>Office Material</option>
                                                <option>Medicines</option>
                                                <option>Car Parts</option>
                                            </Input>
                                        </FormGroup>
                                        {formErrors.itemCategory.length > 0 && (
                                            <span className=''>
                                                {formErrors.itemCategory}
                                            </span>
                                        )}
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label htmlFor='itemDescription'>
                                        Description
                                    </Label>
                                    <Input
                                        type='textarea'
                                        name='itemDescription'
                                        id='itemDescriptionId'
                                        onChange={e => this.handleChange(e)}
                                        value={this.state.itemDescription}
                                        placeholder='Short description about the product'
                                    />
                                </FormGroup>
                                {formErrors.itemDescription.length > 0 && (
                                    <span className=''>
                                        {formErrors.itemDescription}
                                    </span>
                                )}
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor='itemWeight'>
                                                Weight (kg){' '}
                                            </Label>
                                            <Input
                                                type='number'
                                                name='itemWeight'
                                                id='itemWeightId'
                                                placeholder='Weight'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value={this.state.itemWeight}
                                            />
                                        </FormGroup>
                                        {formErrors.itemWeight.length > 0 && (
                                            <span className=''>
                                                {formErrors.itemWeight}
                                            </span>
                                        )}
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
                                                placeholder='Occupied area (cm2)'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value={this.state.occupiedArea}
                                            />
                                        </FormGroup>
                                        {formErrors.occupiedArea.length > 0 && (
                                            <span className=''>
                                                {formErrors.occupiedArea}
                                            </span>
                                        )}
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor='deliveryOrigin'>
                                                Delivery Origin
                                            </Label>
                                            <Input
                                                type='select'
                                                name='deliveryOrigin'
                                                id='deliveryOriginId'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value={
                                                    this.state.deliveryOrigin
                                                }
                                            >
                                                <option />
                                                <option>Porto</option>
                                                <option>Coimbra</option>
                                                <option>Lisboa</option>
                                                <option>Évora</option>
                                                <option>Faro</option>
                                            </Input>
                                        </FormGroup>
                                        {formErrors.deliveryOrigin.length >
                                            0 && (
                                            <span className=''>
                                                {formErrors.deliveryOrigin}
                                            </span>
                                        )}
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor='deliveryDestiny'>
                                                Delivery Destiny
                                            </Label>
                                            <Input
                                                type='select'
                                                name='deliveryDestiny'
                                                id='deliveryDestinyId'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value={
                                                    this.state.deliveryDestiny
                                                }
                                            >
                                                <option />
                                                <option>Porto</option>
                                                <option>Coimbra</option>
                                                <option>Lisboa</option>
                                                <option>Évora</option>
                                                <option>Faro</option>
                                            </Input>
                                        </FormGroup>
                                        {formErrors.deliveryDestiny.length >
                                            0 && (
                                            <span className=''>
                                                {formErrors.deliveryDestiny}
                                            </span>
                                        )}
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label htmlFor='deliveryAddress'>
                                        {' '}
                                        Delivery address{' '}
                                    </Label>
                                    <Input
                                        type='text'
                                        name='deliveryAddress'
                                        id='deliveryAddressId'
                                        placeholder='Address'
                                        onChange={e => this.handleChange(e)}
                                        value={this.state.deliveryAddress}
                                    />
                                </FormGroup>
                                {formErrors.deliveryAddress.length > 0 && (
                                    <span className=''>
                                        {formErrors.deliveryAddress}
                                    </span>
                                )}
                                <FormGroup>
                                    <Label htmlFor='deliveryReceiver'>
                                        {' '}
                                        For whom?{' '}
                                    </Label>
                                    <Input
                                        type='text'
                                        name='deliveryReceiver'
                                        id='deliveryReceiverId'
                                        placeholder='Receiver name'
                                        onChange={e => this.handleChange(e)}
                                        value={this.state.deliveryReceiver}
                                    />
                                </FormGroup>
                                {formErrors.deliveryReceiver.length > 0 && (
                                    <span className=''>
                                        {formErrors.deliveryReceiver}
                                    </span>
                                )}
                                <Row>
                                    <Col xs='6'>
                                        <FormGroup>
                                            <Label htmlFor='deliveryDate'>
                                                Date
                                            </Label>
                                            <Input
                                                type='date'
                                                name='deliveryDate'
                                                id='deliveryDateId'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value={this.state.deliveryDate}
                                            />
                                        </FormGroup>
                                        {formErrors.deliveryDate.length > 0 && (
                                            <span className=''>
                                                {formErrors.deliveryDate}
                                            </span>
                                        )}
                                    </Col>
                                    <Col xs='6'>
                                        <FormGroup>
                                            <Label htmlFor='deliveryHour'>
                                                Time
                                            </Label>
                                            <Input
                                                type='time'
                                                name='deliveryHour'
                                                // step='1'
                                                id='deliveryHourId'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value={this.state.deliveryHour}
                                            />
                                        </FormGroup>
                                        {formErrors.deliveryHour.length > 0 && (
                                            <span className=''>
                                                {formErrors.deliveryHour}
                                            </span>
                                        )}
                                    </Col>
                                </Row>
                                <FormGroup tag='fieldset'>
                                    <legend>Urgency</legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type='radio'
                                                name='urgencyRate'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value='10'
                                            />{' '}
                                            Until 2 hours = 10€
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type='radio'
                                                name='urgencyRate'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value='5'
                                            />{' '}
                                            From 2 hours until 12 hours = 5€
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type='radio'
                                                name='urgencyRate'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value='0'
                                            />{' '}
                                            More than 12hours = 0€
                                        </Label>
                                    </FormGroup>
                                    {formErrors.urgencyRate.length > 0 && (
                                        <span className=''>
                                            {formErrors.urgencyRate}
                                        </span>
                                    )}
                                </FormGroup>
                                <FormGroup tag='fieldset'>
                                    <legend>Payment Method</legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type='radio'
                                                name='paymentMethod'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value='Paypal'
                                            />{' '}
                                            Paypal
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type='radio'
                                                name='paymentMethod'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value='Credit Card'
                                            />
                                            Credit Card - American Express, VISA
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type='radio'
                                                name='paymentMethod'
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                                value='MB'
                                            />{' '}
                                            MB
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                                {formErrors.paymentMethod.length > 0 && (
                                    <span className=''>
                                        {formErrors.paymentMethod}
                                    </span>
                                )}
                                <FormGroup>
                                    <Label htmlFor='itemImage'>
                                        Upload the product photos{' '}
                                    </Label>
                                    <Input
                                        type='file'
                                        name='itemImage'
                                        id='itemImageId'
                                        onChange={e => this.handleChange(e)}
                                        value={this.state.itemImage}
                                        accept='.jpg, .png, .jpeg, |images/*'
                                    />
                                </FormGroup>
                                {formErrors.paymentMethod.length > 0 && (
                                    <span className=''>
                                        {formErrors.paymentMethod}
                                    </span>
                                )}
                                <Button className='submit-btn'>Submit</Button>
                                {this.state.totalPrice !== '' ? (
                                    <p>
                                        {' '}
                                        This delivery will cost you:{' '}
                                        {this.state.totalPrice} €
                                    </p>
                                ) : null}
                                {this.state.isRequired ? (
                                    <Alert color='danger' className='alert'>
                                        All form fields are required for
                                        simulation
                                    </Alert>
                                ) : null}
                            </form>
                        </div>
                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            className={this.props.className}
                        >
                            <ModalHeader toggle={this.toggle}>
                                Confirm your delivery
                            </ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col>
                                        {this.state.deliveryCreated ? (
                                            <p className=''>
                                                Delivery created with success
                                            </p>
                                        ) : (
                                            <p>
                                                {' '}
                                                This delivery will cost you:{' '}
                                                {this.state.totalPrice} €
                                            </p>
                                        )}
                                    </Col>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    type='submit'
                                    color='primary'
                                    onClick={this.confirmDelivery}
                                >
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </Container>
                </section>
            </div>
        );
    }
}
export default Delivery;
