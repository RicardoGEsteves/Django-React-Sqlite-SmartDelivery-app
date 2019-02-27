import React from 'react';
import { Container, Row, Col, Jumbotron, Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <Jumbotron>
                <h1 className='display-3'> Smart Delivery </h1>

                <h2 className='jumbotron-h2'>
                    You can send any item in this category,
                    <br /> you do not need to worry!
                </h2>

                <ul>
                    <li className='category-li'>
                        <img
                            className='category'
                            src='https://cdn0.iconfinder.com/data/icons/transportation-icons-rounded/110/Steering-Wheel-512.png'
                            alt='pickedImage'
                        />
                        <p className='jumbotron-li-title-category'>Car parts</p>
                    </li>
                    <li className='category-li'>
                        <img
                            className='category'
                            src='https://cdn0.iconfinder.com/data/icons/health-icons-rounded/110/Medicines-512.png'
                            alt='pickedImage'
                        />
                        <p className='jumbotron-li-title-category'>Medicines</p>
                    </li>
                    <li className='category-li'>
                        <img
                            className='category'
                            src='https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/eat-circle-orange-512.png'
                            alt='pickedImage'
                        />
                        <p className='jumbotron-li-title-category-food'>Food</p>
                    </li>
                    <li className='category-li'>
                        <img
                            className='category'
                            src='https://cdn3.iconfinder.com/data/icons/design-flat-icons-vol-2/256/51-512.png'
                            alt='pickedImage'
                        />
                        <p className='jumbotron-li-title-category-materialoffice'>
                            Material office{' '}
                        </p>
                    </li>
                </ul>
                <p className='lead'>
                    <Link to='/about'>
                        <Button className='about-more-btn'>About more</Button>
                    </Link>
                </p>
            </Jumbotron>
            <Container>
                <div className='home-info'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </div>
            </Container>

            <section className='section'>
                <Container>
                    <Row>
                        <Col xs='6'>
                            <p className='icon'>
                                <i className='fas fa-shipping-fast' />{' '}
                            </p>
                        </Col>
                        <Col xs='6'>
                            <h2 className='section-features-title'>
                                HOW DOES IT WORK?
                            </h2>
                            <p className='about-feature'>
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Quibusdam, sed? Ut, eos? Neque
                                optio maxime quas ea, ad accusamus iusto
                                explicabo officiis pariatur mollitia earum
                                fugiat a, laborum perferendis dolorum!
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div>
                <ul className='separator-boxes'>
                    <li>
                        <i className='fas fa-box' />
                    </li>
                    <li>
                        <i className='fas fa-box' />
                    </li>
                    <li>
                        <i className='fas fa-box' />
                    </li>
                </ul>
            </div>
            <section className='section-features-good'>
                <Container>
                    <Row>
                        <Col xs='6'>
                            <h2 className='section-features-title'>
                                {' '}
                                HOW MUCH WILL COST?{' '}
                            </h2>
                            <p className='about-feature'>
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Quibusdam, sed? Ut, eos? Neque
                                optio maxime quas ea, ad accusamus iusto
                                explicabo officiis pariatur mollitia earum
                                fugiat a, laborum perferendis dolorum!
                            </p>
                        </Col>
                        <Col xs='6'>
                            <p className='icon thumb-up'>
                                {' '}
                                <i className='fas fa-thumbs-up' />
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div>
                <ul className='separator-boxes'>
                    <li>
                        <i className='fas fa-box' />
                    </li>
                    <li>
                        <i className='fas fa-box' />
                    </li>
                    <li>
                        <i className='fas fa-box' />
                    </li>
                </ul>
            </div>

            <section className='section'>
                <Container>
                    <Row>
                        <Col xs='6'>
                            <p className='icon'>
                                <i className='fas fa-box-open' />
                            </p>
                        </Col>
                        <Col xs='6'>
                            <h2 className='section-features-title'>
                                WHO IS SMART DELIVERY FOR?
                            </h2>
                            <p className='about-feature'>
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Quibusdam, sed? Ut, eos? Neque
                                optio maxime quas ea, ad accusamus iusto
                                explicabo officiis pariatur mollitia earum
                                fugiat a, laborum perferendis dolorum!
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div>
                <ul className='separator-boxes'>
                    <li>
                        <i className='fas fa-box' />
                    </li>
                    <li>
                        <i className='fas fa-box' />
                    </li>
                    <li>
                        <i className='fas fa-box' />
                    </li>
                </ul>
            </div>
            <section className='section-exclusive-portugal'>
                <Container>
                    <div className='only-portugal'>
                        <h2 className='only-portugal-subtitle'>
                            Exclusive for Portugal
                        </h2>
                        <p className='only-portugal-subtitle-p'>
                            Where we are?
                        </p>
                        <Row>
                            <Col xs='6'>
                                <img
                                    className='only-portugal-img'
                                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Flag-map_of_Portugal.svg/2000px-Flag-map_of_Portugal.svg.png'
                                    alt='pickedImage'
                                />
                            </Col>
                            <Col xs='6'>
                                <ul className='only-portugal-where-ul'>
                                    <li>
                                        <Alert
                                            color='secondary'
                                            className='city-success'
                                        >
                                            Porto
                                        </Alert>
                                    </li>
                                    <li>
                                        <Alert
                                            color='secondary'
                                            className='city-success'
                                        >
                                            Lisboa
                                        </Alert>
                                    </li>
                                    <li>
                                        <Alert
                                            color='secondary'
                                            className='city-success'
                                        >
                                            Coimbra
                                        </Alert>
                                    </li>
                                    <li>
                                        <Alert
                                            color='secondary'
                                            className='city-success'
                                        >
                                            Évora
                                        </Alert>
                                    </li>
                                    <li>
                                        <Alert
                                            color='secondary'
                                            className='city-success'
                                        >
                                            Faro
                                        </Alert>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </div>
    );
}
