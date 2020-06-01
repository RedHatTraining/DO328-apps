import React from "react";
import { Brand, Page, PageHeader, PageSidebar } from "@patternfly/react-core";
import imgBrand from "./training_white.png";
import NavList from "./Components/NavList";


type LayoutProps = {
    children: any
}

type LayoutState = {
    isNavOpen: boolean
}

export default class Layout extends React.Component<LayoutProps, LayoutState> {

    constructor(props: LayoutProps) {
        super(props);

        this.state = {
            isNavOpen: true,
        };
    }


    public render() {
        const { isNavOpen } = this.state;

        const logoProps = {
            href: "/frontend/"
        };

        const Header = (
            <PageHeader
                logo={<Brand src={imgBrand} alt="Red Hat Training Logo" className="logo"/>}
                logoProps={logoProps}
                showNavToggle
                isNavOpen={isNavOpen}
                onNavToggle={this.onNavToggle.bind(this)}
                style={{ borderTop: "2px solid #c00" }}
            />
        );

        const Sidebar = <PageSidebar nav={<NavList/>} isNavOpen={isNavOpen} theme="dark" />;

        return (
            <Page header={Header} sidebar={Sidebar} style={{minHeight: 800}}>
                {this.props.children}
            </Page>
        );
    }

    private onNavToggle() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
}
