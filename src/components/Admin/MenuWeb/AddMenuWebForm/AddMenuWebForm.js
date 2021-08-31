import React, { useState } from "react";
import { Form, Select, Button, notification, Input } from "antd";
import { FontSizeOutlined } from "@ant-design/icons";

import "./AddMenuWebForm.scss";

export default function AddMenuWebForm() {
  return (
    <div className="add-menu-web-form">
      <AddForm></AddForm>
    </div>
  );
}

function AddForm() {
  const { Item } = Form;
  const { Option } = Select;

  const selectBefore = (
    <Select defaultValue="http://" style={{ width: 90 }}>
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <Form className="form-add">
      <Item>
        <Input
          placeholder="Title"
          prefix={({ color: "rgba(0, 0, 0, 0.25) " }, (<FontSizeOutlined />))}
        />
      </Item>
      <Item>
        <Input addonBefore={selectBefore} placeholder="URL" />
      </Item>
      <Item>
        <Input placeholder="Description" />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Menu Web
        </Button>
      </Item>
    </Form>
  );
}
