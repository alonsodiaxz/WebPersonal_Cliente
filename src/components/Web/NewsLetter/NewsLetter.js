import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { suscribeNewsletter } from "../../../API/newsletter";

import "./NewsLetter.scss";

export default function NewsLetter() {
  const { Item } = Form;
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const emailValid =
      // eslint-disable-next-line no-useless-escape
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const resultValidation = emailValid.test(email);

    if (resultValidation) {
      suscribeNewsletter(email)
        .then((result) => {
          if (result.code !== 200) {
            notification["warning"]({ message: result.message });
          } else {
            notification["success"]({ message: result.message });
            setEmail("");
          }
        })
        .catch((err) => {
          notification["error"]({ message: err.message });
        });
    } else {
      notification["error"]({ message: "Email no válido." });
    }
  };
  return (
    <div className="newsletter">
      <h3> Newsletter</h3>
      <Form onSubmit={onSubmit}>
        <Item>
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0.25)" }} />}
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            ¡Me suscribo!
          </Button>
        </Item>
      </Form>
    </div>
  );
}
