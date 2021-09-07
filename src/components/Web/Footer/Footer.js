import React from "react";
import { Layout, Row, Col } from "antd";
import MyInfo from "./MyInfo/MyInfo";

import "./Footer.scss";

export default function Footer(props) {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      <Row>
        <Col md={3} />
        <Col md={18}>
          <Row>
            <Col md={8}>
              <MyInfo />
            </Col>
            <Col md={8}> Navegación </Col>
            <Col md={8}> Newsletter </Col>
          </Row>
          <Row className="footer__copyright">
            <Col md={12}> © 2021 ALL RIGHTS RESERVED</Col>
            <Col md={12}>ALONSO DÍAZ SOBRINO | DESARROLLADOR WEB</Col>
          </Row>
        </Col>
        <Col md={3} />
      </Row>
    </Footer>
  );
}
