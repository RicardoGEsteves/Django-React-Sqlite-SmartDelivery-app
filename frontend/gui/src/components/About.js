import React from 'react';
import teamMemberImg from '../img/user-2935527_1280.png';
import {
    Row,
    Col,
    Card,
    CardText,
    CardBody,
    CardImg,
    CardTitle,
    Container
} from 'reactstrap';

export default function About() {
    return (
        <div>
            <h1 className='title-header'>Smart Delivery</h1>
            <img
                className='about-img'
                src='https://www.morphyrichards.co.uk/admin/Images/Editor/Support/support-delivery.jpg'
                alt='pickedImage'
            />

            <section className='section-about'>
                <Container>
                    <Row>
                        <Col>
                            <div className='about-div'>
                                <h2 className='title-page'>About us</h2>
                                <p>
                                    That's a crooked tree. We'll send him to
                                    Washington. These little son of a guns hide
                                    in your brush and you just have to push them
                                    out. These trees are so much fun. I get
                                    started on them and I have a hard time
                                    stopping. How to paint. That's easy. What to
                                    paint. That's much harder. Be brave. The man
                                    who does the best job is the one who is
                                    happy at his job.
                                </p>
                                <p>
                                    Anyone can paint. You can do anything here.
                                    So don't worry about it. Life is too short
                                    to be alone, too precious. Share it with a
                                    friend. Every highlight needs it's own
                                    personal shadow.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Container>
                <div className='ourteam-div'>
                    <h2>Our team</h2>
                    <ul className='ourteam-ul'>
                        <li>
                            <Card>
                                <CardImg
                                    top
                                    width='35%'
                                    src={teamMemberImg}
                                    alt='Card image cap'
                                />
                                <CardBody className='card-info'>
                                    <CardTitle>Ricardo Esteves</CardTitle>

                                    <CardText>
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </li>
                        <li>
                            <Card>
                                <CardImg
                                    top
                                    width='35%'
                                    src={teamMemberImg}
                                    alt='Card image cap'
                                />
                                <CardBody className='card-info'>
                                    <CardTitle>Ricardo Esteves</CardTitle>

                                    <CardText>
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    );
}
