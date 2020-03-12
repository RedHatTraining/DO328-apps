import React from 'react';
import {
    Nav,
    NavItem,
    NavList,
} from '@patternfly/react-core';

import { Link} from "react-router-dom";



class NavDefaultList extends React.Component {
    render() {
        return (
            <Nav onSelect={this.onSelect} theme="dark">
                <NavList>
                    <NavItem id="home" isActive={window.location.pathname === "/"}>
                        <Link to="/">Home</Link>
                    </NavItem>
                    <NavItem id="historical_Data" isActive={window.location.pathname === "/history"}>
                        <Link to="/history" >Historical Data</Link>
                    </NavItem>
                    <NavItem id="exchange" isActive={window.location.pathname === "/exchange"}>
                        <Link to="/exchange" >Exchange</Link>
                    </NavItem>
                    {/* <NavItem id="status">
                        <Link to="/status" >Application Status</Link>
                    </NavItem> */}
                </NavList>
            </Nav>
        );
    }
}

export default NavDefaultList;