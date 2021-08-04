import React, { useState } from "react";
import "./LoginForm.scss";
import { Layout, Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { SignInAPI } from "../../../API/user";

export default function LoginForm() {
  const { Item } = Form;
  //Datos del Login recogidos del formulario
  const [Login, setLogin] = useState({
    email: null,
    password: null,
  });

  const register = async () => {
    const peticion = await SignInAPI(Login);

    if (peticion.accessToken) {
      notification["success"]({
        message: `${peticion.message}`,
      });
    } else {
      notification["error"]({
        message: `${peticion.message}`,
      });
    }
  };

  const changeForm = (ev) => {
    setLogin({
      ...Login,
      [ev.target.name]: ev.target.value,
    });
  };

  return (
    <Form
      className="login-form"
      onSubmitCapture={register}
      onChange={changeForm}
    >
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
  );
}
