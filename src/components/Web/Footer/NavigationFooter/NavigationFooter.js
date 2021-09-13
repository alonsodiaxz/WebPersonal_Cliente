import React from "react";
import { Row, Col, Icon } from "antd";
import {
  BookOutlined,
  CodeOutlined,
  DatabaseOutlined,
  RightOutlined,
  HddOutlined,
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./NavigationFooter.scss";

export default function NavigationFooter() {
  return (
    <Row className="navigation-footer">
      <Col>
        <h3> Navegación</h3>
      </Col>
      <Col md={12}>
        <RenderListLeft />
      </Col>
      <Col md={12}>
        <RenderListRight />
      </Col>
    </Row>
  );
}

function RenderListLeft() {
  return (
    <ul>
      <li>
        <a href="#">
          <BookOutlined /> Cursos online
        </a>
      </li>
      <li>
        <Link to="/contact">
          <CodeOutlined />
          Desarrollo Web
        </Link>
      </li>
      <li>
        <Link to="/contact">
          <DatabaseOutlined /> Base de datos
        </Link>
      </li>
      <li>
        <Link to="/contact">
          <RightOutlined /> Política de privacidad
        </Link>
      </li>
    </ul>
  );
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <a href="#">
          <HddOutlined /> Sistemas / servidores
        </a>
      </li>
      <li>
        <Link to="/contact">
          <AppstoreOutlined />
          CMS
        </Link>
      </li>
      <li>
        <Link to="/contact">
          <UserOutlined /> Portfolio
        </Link>
      </li>
      <li>
        <Link to="/contact">
          <RightOutlined /> Política de cookies
        </Link>
      </li>
    </ul>
  );
}
