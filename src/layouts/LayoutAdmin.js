import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn/SignIn";

import "./LayoutAdmin.scss";

function LoadRoutes(props) {
  const { routes } = props;

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

export default function LayoutAdmin(props) {
  const { routes } = props;
  const { Header, Content, Footer } = Layout;
  const [menuCollapsed, setmenuCollapsed] = useState(false);
  const user = null;

  //Condición que te redirige a esta ruta en caso de que no haya ningun usuario logeado.
  if (!user) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  return (
    <Layout>
      <MenuSider menuCollapsed={menuCollapsed} />
      <Layout
        className="layout-admin"
        style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
      >
        <Header className="layout-admin__header">
          <MenuTop
            menuCollapsed={menuCollapsed}
            setmenuCollapsed={setmenuCollapsed}
          />
        </Header>
        <Content className="layout-admin__content">
          <LoadRoutes routes={routes} />
        </Content>
        <Footer className="layout-admin__footer">
          Alonso Diaz Sobrino 2021
        </Footer>
      </Layout>
    </Layout>
  );
}
