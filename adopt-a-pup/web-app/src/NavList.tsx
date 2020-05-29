import React from "react";
import {
    Nav,
    NavItem,
    NavList,
} from "@patternfly/react-core";

import { Link} from "react-router-dom";



class NavDefaultList extends React.Component {
    render() {
        return (
            <Nav theme="dark">
                <NavList>
                    <NavItem id="home" isActive={window.location.pathname.endsWith("/")}>
                        <Link to="/">Home</Link>
                    </NavItem>
                    <NavItem id="shelters" isActive={window.location.pathname.endsWith("/shelters")}>
                        <Link to="/shelters" >Shelters</Link>
                    </NavItem>
                    <NavItem id="your-animals" isActive={window.location.pathname.endsWith("/your-animals")}>
                        <Link to="/your-animals" >Your Animals</Link>
                    </NavItem>
                </NavList>
            </Nav>
        );
    }
}

export default NavDefaultList;
