import React from 'react';
import { Brand, Page, PageHeader, PageSidebar, PageSection } from '@patternfly/react-core';

import imgBrand from './training_white.png'
import NavList from './NavList'

class VerticalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: true,
    };
    this.onNavToggle = () => {
      this.setState({
        isNavOpen: !this.state.isNavOpen
      });
    };
  }


  render() {
    const { isNavOpen } = this.state;

    const logoProps = {
      href: '/frontend/'
    };
    const Header = (
      <PageHeader
        logo={<Brand src={imgBrand} alt="Patternfly Logo" />}
        logoProps={logoProps}
        showNavToggle
        isNavOpen={isNavOpen}
        onNavToggle={this.onNavToggle}
        style={{ borderTop: "2px solid #c00" }}
      />
    );
    const Sidebar = <PageSidebar nav={<NavList/>} isNavOpen={isNavOpen} theme="dark" />;

    return (
      <Page header={Header} sidebar={Sidebar} style={{minHeight: 800}}>
        <PageSection >
          {this.props.children}
        </PageSection>
      </Page>
    );
  }
}

export default VerticalPage;
