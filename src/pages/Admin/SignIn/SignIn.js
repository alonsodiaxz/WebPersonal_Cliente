import React from "react";
import { Redirect } from "react-router-dom";
import { Layout, Tabs } from "antd";
import Logo from "../../../assets/img/png/LABM.png";
import "./SignIn.scss";
import RegisterForm from "../../../components/Admin/RegisterForm/RegisterForm";
import LoginForm from "../../../components/Admin/LoginForm/LoginForm";
import { getAccessToken } from "../../../API/auth";

export default function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  if (getAccessToken()) {
    return <Redirect to="/admin" />;
  }

  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img src={Logo} alt="Alonso Diaz Sobrino"></img>
        </h1>
        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span> Entrar</span>} key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab={<span> Nuevo Usuario</span>} key="2">
              <RegisterForm></RegisterForm>
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
