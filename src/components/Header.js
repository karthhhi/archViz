import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router";

function Header(props) {
  const { location } = props;
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        eCommerce Architecture
      </Navbar.Brand>
      <Nav activeKey={location.pathname} className="ml-auto">
        <Nav.Link href="/">View Architecture Diagram</Nav.Link>
        <Nav.Link href="/form">Add/Edit Architecture Components</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default withRouter(Header);