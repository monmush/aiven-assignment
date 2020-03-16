import React from "react";
import { Row, Col } from "antd";
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <Row justify="space-between" align="middle" className="NavBar">
      <Col lg={4}>
        <Link to="/" className="logo">
          WEB CONSOLE
        </Link>
      </Col>
      <Col lg={10} className="NavBar-NavLink">
        <Link to="/">Overview</Link>
        <Link to="/">Docs</Link>
        <Link to="/">Tutorial</Link>
        <Link to="/">Sign out</Link>
      </Col>
    </Row>
  );
};

export default React.memo(NavBar);
