import React from "react";
import { Layout, Row, Col } from "antd";
import { Route, Switch } from "react-router-dom";
import "./LayoutBasic.scss";
import MenuTop from "../components/Web/MenuTop/MenuTop";

function LoadRoutes({ routes }) {
  const rutas = (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
  return rutas;
}

export default function LayoutBasic(props) {
  const { routes } = props;
  const { Footer } = Layout;

  return (
    <Row>
      <Col md={3}></Col>
      <Col md={18}>
        <MenuTop />
        <LoadRoutes routes={routes} />
        <Footer> Alonso Diaz Sobrino</Footer>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
