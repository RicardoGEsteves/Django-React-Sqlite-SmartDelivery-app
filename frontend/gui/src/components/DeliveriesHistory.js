import React, { Component } from 'react';
import { fetchDeliveries } from '../api/index';
import {
    Container,
    Col,
    Button,
    Row,
    Collapse,
    CardBody,
    Card
} from 'reactstrap';

export default class DeliveriesHistory extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            userID: this.props.location.state.userID,
            deliveries: [],
            userDeliveries: [],
            collapse: false
        };
    }

    getDeliveries = async () => {
        const deliveries = await fetchDeliveries();
        this.setState({ deliveries });
    };

    handleOnClick = () => {
        this.getDeliveries();
        this.toggle();

        const { deliveries, userID } = this.state;
        const userDeliveries = deliveries.filter(userDeliveries => {
            return userDeliveries.userID === userID;
        });
        this.setState({ userDeliveries: userDeliveries });
    };

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    render() {
        console.log(this.state.userDeliveries);
        const userDeliveries = this.state.userDeliveries;
        return (
            <div>
                <h1 className='title-header'>Smart Delivery</h1>
                <img
                    className='deliveryhistoric-img'
                    src='https://www.commercial-bank.com/userfiles/filemanager/inrwm6sehhbas6mvmeon/'
                    alt='pickedImage'
                />
                <section className='section-delivery'>
                    <Container>
                        <div className=''>
                            <h2 className='title-page'> Deliveries History </h2>
                            <Button
                                color='danger'
                                onClick={this.handleOnClick}
                                className='btn-deliveries'
                            >
                                Check your deliveries
                            </Button>
                        </div>
                        <Collapse isOpen={this.state.collapse}>
                            {userDeliveries.map(delivery => {
                                return (
                                    <Card
                                        className='card-deliveryhistory'
                                        key={delivery.id}
                                    >
                                        <CardBody>
                                            <Row className='deliveryid-row'>
                                                <p className='numberid'>
                                                    Delivery ID: {delivery.id}
                                                </p>
                                            </Row>
                                            <Row>
                                                <Col sm='4'>
                                                    <p>
                                                        <span> Truck ID: </span>
                                                        {delivery.truckID}
                                                    </p>
                                                    <p>
                                                        <span>
                                                            Name of the Product:{' '}
                                                        </span>
                                                        {delivery.itemName}
                                                    </p>
                                                    <p>
                                                        <span>
                                                            {' '}
                                                            Product Description:{' '}
                                                        </span>
                                                        {
                                                            delivery.itemDescription
                                                        }
                                                    </p>
                                                    <p>
                                                        <span>
                                                            {' '}
                                                            Product Weight:{' '}
                                                        </span>
                                                        {delivery.itemWeight}
                                                    </p>

                                                    <p>
                                                        <span>
                                                            Product Dimensions:{' '}
                                                        </span>
                                                        {delivery.occupiedArea}
                                                    </p>
                                                </Col>
                                                <Col sm='4'>
                                                    <p>
                                                        <span>
                                                            {' '}
                                                            Product Urgency:{' '}
                                                        </span>
                                                        {delivery.urgencyRate}
                                                    </p>
                                                    <p>
                                                        <span>
                                                            {' '}
                                                            Product Category:{' '}
                                                        </span>
                                                        {delivery.itemCategory}
                                                    </p>

                                                    <p>
                                                        <span>
                                                            {' '}
                                                            Delivery Date:{' '}
                                                        </span>
                                                        {delivery.deliveryDate}
                                                    </p>

                                                    <p>
                                                        <span>
                                                            {' '}
                                                            Delivery Hour:{' '}
                                                        </span>
                                                        {delivery.deliveryHour}
                                                    </p>
                                                    <p>
                                                        <span>
                                                            {' '}
                                                            Delivery Total
                                                            Price:{' '}
                                                        </span>
                                                        {delivery.totalPrice}
                                                    </p>
                                                </Col>
                                                <Col sm='4'>
                                                    <p>
                                                        <span>
                                                            {' '}
                                                            Delivery Origin:{' '}
                                                        </span>
                                                        {
                                                            delivery.deliveryOrigin
                                                        }
                                                    </p>

                                                    <p>
                                                        <span>
                                                            {' '}
                                                            Delivery Destiny:{' '}
                                                        </span>
                                                        {
                                                            delivery.deliveryDestiny
                                                        }
                                                    </p>
                                                    <p>
                                                        <span>
                                                            {' '}
                                                            Who Received the
                                                            Delivery:{' '}
                                                        </span>
                                                        {
                                                            delivery.deliveryReceiver
                                                        }
                                                    </p>
                                                    <p>
                                                        <span>
                                                            Delivery Address:{' '}
                                                        </span>
                                                        {
                                                            delivery.deliveryAddress
                                                        }
                                                    </p>
                                                    <p>
                                                        <span>
                                                            Delivery Payment
                                                            Method:{' '}
                                                        </span>
                                                        {delivery.paymentMethod}
                                                    </p>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                );
                            })}
                        </Collapse>
                    </Container>
                </section>
            </div>
        );
    }
}
