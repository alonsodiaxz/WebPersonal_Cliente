import React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import "./LayoutBasic.scss";

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
  const { Content, Footer } = Layout;
  return (
    <Layout>
      <h2> Menu...</h2>
      <Layout>
        <Content>
          <LoadRoutes routes={routes} />
        </Content>
        <Footer> Alonso Diaz Sobrino</Footer>
      </Layout>
    </Layout>
  );
}
