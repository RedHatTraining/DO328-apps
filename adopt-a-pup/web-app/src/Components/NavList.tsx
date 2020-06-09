import React from "react";
import {
    Nav,
    NavItem,
    NavList,
    NavGroup,
} from "@patternfly/react-core";

import { Link } from "react-router-dom";
import Environment from "../Config";



export default class NavDefaultList extends React.Component {

    public render() {
        const { pathname } = window.location;
        const enableNews = Environment.getEnv("REACT_APP_NEWS_ENABLED");
        const emailAppUrl = Environment.getEnv("REACT_APP_EMAIL_APP_URL");
        return (
            <Nav theme="dark">
                <NavList>
                    <NavItem id="home" isActive={pathname.endsWith("/")}>
                        <Link to="/">Home</Link>
                    </NavItem>
                    <NavItem id="animals" isActive={pathname.endsWith("/animals")}>
                        <Link to="/animals" >Adoptable Animals</Link>
                    </NavItem>
                    <NavItem id="shelters" isActive={pathname.endsWith("/shelters")}>
                        <Link to="/shelters" >Our Shelters</Link>
                    </NavItem>
                    <NavItem id="notifications" isActive={pathname.endsWith("/notifications")}>
                        <Link to="/notifications">Notifications</Link>
                    </NavItem>
                    {enableNews && <NavItem id="news" isActive={pathname.endsWith("/news")}>
                        <Link to="/news" >News</Link>
                    </NavItem>}
                    <NavItem id="external-email">
                        <a
                            href={emailAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Your messages
                        </a>
                    </NavItem>
                    <NavGroup title="Management">
                        <NavItem
                            id="shelters"
                            isActive={pathname.endsWith("/manage/shelters/create")}
                        >
                            <Link to="/manage/shelters/create" >Create Shelter</Link>
                        </NavItem>
                        <NavItem
                            id="animals-create"
                            isActive={pathname.endsWith("/manage/animals/create")}
                        >
                            <Link to="/manage/animals/create" >Create Animal</Link>
                        </NavItem>
                    </NavGroup>

                </NavList>
            </Nav>
        );
    }

}
