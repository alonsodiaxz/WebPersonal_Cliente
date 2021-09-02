import React, { useEffect, useState } from "react";
import { Form, Input, Select, notification, Button } from "antd";
import { updateMenu } from "../../../../API/menu";
import { getAccessToken } from "../../../../API/auth";
import { FontSizeOutlined } from "@ant-design/icons";

import "./EditMenuWebForm.scss";

export default function EditMenuWebForm(props) {
  const { item, setReloadMenuWeb, setIsVisibleModal } = props;
  const { _id } = item;
  const { Item } = Form;
  const { Option } = Select;
  const [menuWebData, setmenuWebData] = useState({});

  useEffect(() => {
    setmenuWebData(item);
  }, [item]);

  const editMenuWebForm = () => {
    let menu = {
      title: menuWebData.title,
      url: (menuWebData.http ? menuWebData.http : "") + menuWebData.url,
    };
    const token = getAccessToken();
    updateMenu(token, _id, menu)
      .then((response) => {
        notification["success"]({
          message: response.message,
        });
        setReloadMenuWeb(true);
        setIsVisibleModal(false);
      })
      .catch((err) => {
        notification["error"]({
          message: err.message,
        });
      });
  };

  const select = () => {
    return (
      <Select
        defaultValue="http://"
        style={{ width: 90 }}
        onChange={(e) =>
          setmenuWebData({
            ...menuWebData,
            http: e,
          })
        }
      >
        <Option value="http://">http://</Option>
        <Option value="https://">https://</Option>
      </Select>
    );
  };

  return (
    <Form className="edit-menu-web-form" onSubmitCapture={editMenuWebForm}>
      <Item>
        <Input
          prefix={({ color: "rgba(0, 0, 0, 0.25) " }, (<FontSizeOutlined />))}
          placeholder="titulo"
          onChange={(e) =>
            setmenuWebData({
              ...menuWebData,
              title: e.target.value,
            })
          }
        ></Input>
      </Item>
      <Item>
        <Input
          addonBefore={select()}
          placeholder="URL"
          onChange={(e) => {
            setmenuWebData({
              ...menuWebData,
              url: e.target.value,
            });
          }}
        ></Input>
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Editar Menu Web
        </Button>
      </Item>
    </Form>
  );
}
