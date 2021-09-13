import React from "react";
import { Layout, Row, Col } from "antd";
import MyInfo from "./MyInfo/MyInfo";
import NavigationFooter from "./NavigationFooter/NavigationFooter";
import NewsLetter from "../NewsLetter/NewsLetter";

import "./Footer.scss";

export default function Footer(props) {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      <Row>
        <Col md={3} />
        <Col md={18}>
          <Row>
            <Col md={6}>
              <MyInfo />
            </Col>
            <Col md={8}>
              <NavigationFooter />
            </Col>
            <Col md={8}>
              <NewsLetter />
            </Col>
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
