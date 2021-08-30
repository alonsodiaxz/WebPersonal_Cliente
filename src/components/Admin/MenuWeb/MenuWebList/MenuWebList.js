import React, { useEffect, useState } from "react";
import { List, Switch, Button, Modal as ModalAntd, notification } from "antd";
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { updateMenu, activateMenu } from "../../../../API/menu";
import { getAccessToken } from "../../../../API/auth";

import "./MenuWebList.scss";
const { confirm } = ModalAntd;

export default function MenuWebList(props) {
  const { menu, setReloadMenuWeb } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [listItems, setListItems] = useState([]);
  const token = getAccessToken();

  useEffect(() => {
    const listItemsArray = [];
    menu.forEach((item) => {
      listItemsArray.push({
        content: (
          <div>
            <MenuItem item={item} token={token} />
          </div>
        ),
      });
    });
    setListItems(listItemsArray);
  }, [menu]);

  const onSort = (sortedList, dropEvent) => {
    sortedList.forEach((item) => {
      const { _id } = item.content.props.children.props.item;
      const order = item.rank;
      updateMenu(token, _id, { order });
    });

    console.log(dropEvent);
  };

  const activateMenu = () => {};

  return (
    <div className="menu-web-list">
      <div className="menu-web-list__header">
        <Button type="primary">Menu</Button>
      </div>
      <div className="menu-web-list__items">
        <DragSortableList items={listItems} onSort={onSort} type="vertical" />
      </div>
    </div>
  );
}

function MenuItem(props) {
  const { item, token } = props;
  const { Item } = List;

  const checked = (e) => {
    activateMenu(token, item._id, e)
      .then((response) => {
        notification["success"]({
          message: response.message,
        });
      })
      .catch((err) => {
        notification["success"]({
          message: err.message,
        });
      });
  };

  return (
    <Item
      actions={[
        <Switch defaultChecked={item.active} onChange={checked} />,
        <Button type="primary">
          <EditOutlined />
        </Button>,

        <Button type="danger">
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <Item.Meta title={item.title} description={item.url} />
    </Item>
  );
}