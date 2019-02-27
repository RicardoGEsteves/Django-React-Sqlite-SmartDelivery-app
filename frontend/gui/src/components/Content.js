import React, { Component } from 'react';
import Routes from '../router/Routes';
export default class Content extends Component {
    render() {
        return (
            <div>
                <Routes {...this.props} />
            </div>
        );
    }
}
