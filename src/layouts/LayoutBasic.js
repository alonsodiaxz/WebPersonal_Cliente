import React from "react";
import { Row, Col } from "antd";
import { Route, Switch } from "react-router-dom";
import "./LayoutBasic.scss";
import MenuTop from "../components/Web/MenuTop/MenuTop";
import Footer from "../components/Web/Footer";

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

  return (
    <>
      <Row>
        <Col md={3}></Col>
        <Col md={18}>
          <MenuTop />
        </Col>
        <Col md={3}></Col>
      </Row>
      <LoadRoutes routes={routes} />
      <Footer />
    </>
  );
}
