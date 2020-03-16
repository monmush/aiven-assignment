import React from "react";
import { Row, Col } from "antd";

const Header = () => {
  return (
    <Row justify="space-between" className="Header" align="middle">
      <Col lg={10} className="Header-Text">
        <h1>Create a new service</h1>
        <p>
          Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text.
        </p>
      </Col>
      <Col lg={6}>
        <a href="/" className="Button-Link">
          Already have a cluster?
        </a>
      </Col>
    </Row>
  );
};

export default Header
