import React from 'react';
import { elastic as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

export default props => {
    return (
        <Menu {...props}>
            <Link className='menu-item' to='/'>
                Home
            </Link>
            <Link className='menu-item' to='/about'>
                About
            </Link>
            <Link className='menu-item' to='/simulator'>
                Simulator
            </Link>
            {props.loggedUser.username !== '' &&
            props.loggedUser.email !== '' ? (
                <Link
                    className='menu-item'
                    to={{
                        pathname: '/delivery',
                        state: {
                            userID: props.loggedUser.id
                        }
                    }}
                >
                    Delivery
                </Link>
            ) : null}
            {props.loggedUser.username !== '' &&
            props.loggedUser.email !== '' ? (
                <Link
                    className='menu-item'
                    to={{
                        pathname: '/history',
                        state: {
                            userID: props.loggedUser.id
                        }
                    }}
                >
                    History
                </Link>
            ) : null}

            <Link className='menu-item' to='/contacts'>
                Contacts
            </Link>
        </Menu>
    );
};
