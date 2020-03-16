import React, { FunctionComponent } from "react";
import { Row } from "antd";

const Layout: FunctionComponent = ({ children }) => {
  return <Row className="Layout">{children}</Row>;
};

export default Layout;
