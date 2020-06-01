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
        const enableNews = process.env.REACT_APP_NEWS_ENABLED;
        return (
            <Nav theme="dark">
                <NavList>
                    <NavItem id="home" isActive={pathname.endsWith("/")}>
                        <Link to="/">Home</Link>
                    </NavItem>
                    <NavItem id="shelters" isActive={pathname.endsWith("/shelters")}>
                        <Link to="/shelters" >Shelters</Link>
                    </NavItem>
                    <NavItem id="animals" isActive={pathname.endsWith("/animals")}>
                        <Link to="/animals" >Animals</Link>
                    </NavItem>
                    {enableNews && <NavItem id="news" isActive={pathname.endsWith("/news")}>
                        <Link to="/news" >News</Link>
                    </NavItem>}
                </NavList>
            </Nav>
        );
    }

}
