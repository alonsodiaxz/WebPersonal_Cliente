import React, { useState } from "react";
import { Form, Button, Checkbox, notification, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/FormValidation";
import { signUpAPI } from "../../../API/user";
import "./RegisterForm.scss";

export default function RegisterForm() {
  const [input, setInputs] = useState({
    email: null,
    password: null,
    repeatPassword: null,
    privacyPolicy: false,
  });
  const [formValidation, setformValidation] = useState({
    email: null,
    password: null,
    repeatPassword: null,
    privacyPolicy: false,
  });

  const changeForm = (ev) => {
    if (ev.target.name === "privacyPolicy") {
      setInputs({
        ...input,
        [ev.target.name]: ev.target.checked,
      });
    } else {
      setInputs({ ...input, [ev.target.name]: ev.target.value });
    }
  };

  const inputValidation = (e) => {
    const { type, name } = e.target;
    if (type === "email") {
      setformValidation({
        ...formValidation,
        [name]: emailValidation(e.target),
      });
    }

    if (type === "password") {
      setformValidation({
        ...formValidation,
        [name]: minLengthValidation(e.target, 6),
      });
    }

    if (type === "checkbox") {
      setformValidation({
        ...formValidation,
        [name]: e.target.checked,
      });
    }
  };

  const Register = async (ev) => {
    ev.preventDefault(); //Para que cuando pulsemos el boton de submit no recargue la pagina.
    const { email, password, repeatPassword, privacyPolicy } = formValidation;
    const emailValue = input.email;
    const passwordValue = input.password;
    const repeatPasswordValue = input.repeatPassword;
    const privacyPolicyVal = input.privacyPolicy;

    if (
      !emailValue ||
      !passwordValue ||
      !repeatPasswordValue ||
      !privacyPolicyVal
    ) {
      notification["error"]({ message: "Todos los campos son obligatorios." });
    } else {
      if (email && password && repeatPassword && privacyPolicy) {
        if (passwordValue === repeatPasswordValue) {
          //Conectamos con el API para registrar el usuario
          const result = await signUpAPI(input);
          if (result.user) {
            notification["success"]({
              message: "Usuario registrado con éxito.",
            });
            resetForm();
          } else {
            notification["error"]({
              message: `${result}`,
            });
          }
        } else {
          notification["error"]({ message: "Las contraseñas no son iguales." });
        }
      } else {
        notification["error"]({ message: "Los campos estan incorrectos." });
      }
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setInputs({
      email: null,
      password: null,
      repeatPassword: null,
      privacyPolicy: false,
    });

    setformValidation({
      email: null,
      password: null,
      repeatPassword: null,
      privacyPolicy: false,
    });
  };

  const { Item } = Form;
  return (
    <Form
      className="register-form"
      onSubmitCapture={Register}
      onChange={changeForm}
    >
      <Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="register-form__input"
          value={input.email}
          onChange={inputValidation}
        />
      </Item>
      <Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          value={input.password}
          onChange={inputValidation}
        ></Input>
      </Item>
      <Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password" //Hace que lo que estes escribiendo se poca en formato oculto
          name="repeatPassword"
          placeholder="Repita la contraseña"
          className="register-form__input"
          value={input.repeatPassword}
          onChange={inputValidation}
        ></Input>
      </Item>
      <Item>
        <Checkbox
          name="privacyPolicy"
          type="checkbox"
          checked={input.privacyPolicy}
          onChange={inputValidation}
        >
          He leído y acepto la política de privacidad
        </Checkbox>
      </Item>
      <Item>
        <Button htmlType="submit" className="register-form__button">
          Crear Cuenta
        </Button>
      </Item>
    </Form>
  );
}
