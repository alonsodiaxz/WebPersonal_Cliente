import React, { useState } from "react";
import { Form, Select, Button, notification, Input } from "antd";
import { FontSizeOutlined } from "@ant-design/icons";
import { createMenuWeb } from "../../../../API/menu";
import { getAccessToken } from "../../../../API/auth";

import "./AddMenuWebForm.scss";

export default function AddMenuWebForm(props) {
  const { setIsVisibleModal, setReloadMenuWeb } = props;
  const [menuWebData, setMenuWebData] = useState({ http: "http://" });

  return (
    <div className="add-menu-web-form">
      <AddForm
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
      ></AddForm>
    </div>
  );
}

function AddForm(props) {
  const { Item } = Form;
  const { Option } = Select;
  const { menuWebData, setMenuWebData, setIsVisibleModal, setReloadMenuWeb } =
    props;
  const token = getAccessToken();

  const onChange = (e) => {
    setMenuWebData({
      ...menuWebData,
      [e.target.name]: e.target.value,
    });
  };

  const selectBefore = (
    <Select
      defaultValue="http://"
      style={{ width: 90 }}
      onChange={(e) => setMenuWebData({ ...menuWebData, http: e })}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  const onSubmit = () => {
    let menuData = {
      title: menuWebData.title,
      url: menuWebData.http + menuWebData.url,
    };

    if (!menuData.title || !menuData.url) {
      notification["error"]({
        message: "Faltan datos",
      });
    } else {
      menuData.active = false;
      menuData.order = 1000;

      createMenuWeb(token, menuData)
        .then((result) => {
          notification["success"]({ message: result.message });
          setReloadMenuWeb(true);
          setIsVisibleModal(false);
        })
        .catch((err) => {
          notification["error"]({ message: err.message });
        });
    }
  };

  return (
    <Form className="form-add" onSubmitCapture={onSubmit}>
      <Item>
        <Input
          placeholder="Title"
          prefix={({ color: "rgba(0, 0, 0, 0.25) " }, (<FontSizeOutlined />))}
          onChange={onChange}
          name="title"
        />
      </Item>
      <Item>
        <Input
          addonBefore={selectBefore}
          placeholder="URL"
          onChange={onChange}
          name="url"
        />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Menu Web
        </Button>
      </Item>
    </Form>
  );
}
