import React, { useState } from "react";
import { Button, Col, Form, Input, notification, Row, Select } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { signUpAdmin } from "../../../../API/user";
import { getAccessToken } from "../../../../API/auth";
import "./CreateUserForm.scss";
import {
  minLengthValidation,
  nameLastNameValidation,
  emailValidation,
} from "../../../../utils/FormValidation";

export default function CreateUserForm(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [userData, setUserData] = useState(null);
  const [userValidation, setUserValidation] = useState({
    name: null,
    lastname: null,
    email: null,
    password: null,
    repeatPassword: null,
  });
  const { name, lastname, password, repeatPassword, email } = userValidation;

  const addUser = (e) => {
    e.preventDefault();
    if (!name || !lastname || !email || !password || !repeatPassword) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else {
      if (userData.password !== userData.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas no son iguales.",
        });
      } else {
        setIsVisibleModal(false);
        setReloadUsers(true);
        const token = getAccessToken();
        signUpAdmin(token, userData)
          .then((response) => {
            notification["success"]({
              message: response.message,
            });
          })
          .catch((err) => {
            notification["error"]({
              message: err.message,
            });
          });
      }
    }
  };

  return (
    <AddForm
      userData={userData}
      setUserData={setUserData}
      addUser={addUser}
      userValidation={userValidation}
      setUserValidation={setUserValidation}
    />
  );
}

function AddForm(props) {
  const { userData, setUserData, addUser, setUserValidation, userValidation } =
    props;
  const { Item } = Form;
  const { Option } = Select;

  const changes = (e) => {
    const { name, type } = e.target;
    if (type === "password") {
      setUserData({ ...userData, [name]: e.target.value });
      setUserValidation({
        ...userValidation,
        [name]: minLengthValidation(e.target, 6),
      });
    }

    if (name === "email") {
      setUserData({ ...userData, [name]: e.target.value });
      setUserValidation({
        ...userValidation,
        [name]: emailValidation(e.target),
      });
    }

    if (type === "text") {
      setUserData({ ...userData, [name]: e.target.value });
      setUserValidation({
        ...userValidation,
        [name]: nameLastNameValidation(e.target),
      });
    }
  };
  return (
    <Form className="form-add" onSubmitCapture={addUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Item>
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              name="name"
              placeholder="Nombre"
              onChange={changes}
            ></Input>
          </Item>
        </Col>
        <Col span={12}>
          <Item>
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              name="lastname"
              placeholder="Apellidos"
              onChange={changes}
            ></Input>
          </Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Item>
            <Input
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="email"
              name="email"
              placeholder="Email"
              onChange={changes}
            ></Input>
          </Item>
        </Col>
        <Col span={12}>
          <Item>
            <Select
              placeholder="Selecciona un rol"
              onChange={(e) => {
                setUserData({ ...userData, role: e });
              }}
            >
              <Option value="admin"> Administrador</Option>
              <Option value="editor"> Editor</Option>
              <Option value="reviewer"> Revisor</Option>
            </Select>
          </Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Item>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={changes}
            ></Input>
          </Item>
        </Col>
        <Col span={12}>
          <Item>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              name="repeatPassword"
              type="password"
              placeholder="Repetir contraseña"
              onChange={changes}
            ></Input>
          </Item>
        </Col>
      </Row>
      <Row>
        <Item>
          <Button className="form-add__button" type="primary" htmlType="submit">
            Añadir usuario
          </Button>
        </Item>
      </Row>
    </Form>
  );
}
