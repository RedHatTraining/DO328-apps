import React from "react";
import {
    Nav,
    NavItem,
    NavList,
} from "@patternfly/react-core";

import { Link} from "react-router-dom";



export default class NavDefaultList extends React.Component {

    public render() {
        const { pathname } = window.location;
        return (
            <Nav theme="dark">
                <NavList>
                    <NavItem id="home" isActive={pathname.endsWith("/")}>
                        <Link to="/">Home</Link>
                    </NavItem>
                    <NavItem id="shelters" isActive={pathname.endsWith("/shelters")}>
                        <Link to="/shelters" >Shelters</Link>
                    </NavItem>
                    <NavItem id="your-animals" isActive={pathname.endsWith("/your-animals")}>
                        <Link to="/your-animals" >Your Animals</Link>
                    </NavItem>
                </NavList>
            </Nav>
        );
    }

}
