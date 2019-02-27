import React from 'react';

const Footer = () => {
    return (
        <div className='footer-content'>
            <ul>
                <li>
                    <a href='https://github.com/'>
                        <i className='fab fa-github' />
                    </a>
                </li>
                <li>
                    <a href='https://www.linkedin.com/'>
                        <i className='fab fa-linkedin' />
                    </a>
                </li>
                <li>
                    <a href='https://twitter.com/'>
                        <i className='fab fa-twitter-square' />
                    </a>
                </li>
                <li>
                    <a href='https://www.facebook.com/'>
                        <i className='fab fa-facebook-square' />
                    </a>
                </li>
                <li>
                    <a href='https://www.instagram.com/'>
                        <i className='fab fa-instagram' />
                    </a>
                </li>
                <li>
                    <a href='https://plus.google.com/'>
                        <i className='fab fa-google-plus' />
                    </a>
                </li>
            </ul>
            <p>&copy; 2019 Smart Delivery</p>
        </div>
    );
};

export default Footer;
