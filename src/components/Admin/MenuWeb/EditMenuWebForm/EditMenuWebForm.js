import React from "react";
import { Form, Input, Select, notification, Button } from "antd";

import "./EditMenuWebForm.scss";

export default function EditMenuWebForm(props) {
  const { item } = props;
  const { Item } = Form;
  const { Option } = Select;

  const editMenuWebForm = () => {
    console.log("hola");
  };

  const select = () => {
    return (
      <Select defaultValue="http://" style={{ width: 90 }}>
        <Option value="http://">http://</Option>
        <Option value="https://">https://</Option>
      </Select>
    );
  };

  return (
    <Form className="edit-menu-web-form" onSubmitCapture={editMenuWebForm}>
      <Item>
        <Input placeholder="titulo" value={item.title}></Input>
      </Item>
      <Item>
        <Input
          addonBefore={select()}
          placeholder="URL"
          value={item.url}
        ></Input>
      </Item>
      <Item>
        <Button type="primary" htmlType="onsubmit">
          Editar Menu Web
        </Button>
      </Item>
    </Form>
  );
}
