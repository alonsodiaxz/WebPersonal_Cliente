import React from "react";
import "./LoginForm.scss";
import { Layout, Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const {} = Layout;

export default function LoginForm() {
  const { Item } = Form;
  return (
    <Layout>
      <Form className="login-form">
        <Item>
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="login-form__input"
          />
        </Item>
        <Item>
          <Input
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            name="password"
            placeholder="Contraseña"
            className="login-form__input"
          ></Input>
        </Item>
        <Item>
          <Button htmlType="submit" className="login-form__button">
            Entrar
          </Button>
        </Item>
      </Form>
    </Layout>
  );
}
