import React from 'react';
import {
    Nav,
    NavItem,
    NavList,
} from '@patternfly/react-core';

import { Link} from "react-router-dom";



class NavDefaultList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 0
        };
        this.onSelect = result => {
            this.setState({
                activeItem: result.itemId
            });
        };
    }

    render() {
        const { activeItem } = this.state;
        return (
            <Nav onSelect={this.onSelect} theme="dark">
                <NavList>
                    <NavItem id="home" itemId={0} isActive={activeItem === 0}>
                        <Link to="/">Home</Link>
                    </NavItem>
                    <NavItem id="historical_Data" itemId={1} isActive={activeItem === 1}>
                        <Link to="/history" >Historical Data</Link>
                    </NavItem>
                    <NavItem id="exchange" itemId={2} isActive={activeItem === 2}>
                        <Link to="/exchange" >Exchange</Link>
                    </NavItem>
                    {/* <NavItem id="status" itemId={3} isActive={activeItem === 3}>
                        <Link to="/status" >Application Status</Link>
                    </NavItem> */}
                </NavList>
            </Nav>
        );
    }
}

export default NavDefaultList;