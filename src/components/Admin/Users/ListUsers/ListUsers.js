import React, { useEffect, useState } from "react";
import { Switch, List, Avatar, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "./ListUsers.scss";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";

export default function ListUsers(props) {
  const { usersActive, usersInactive } = props;
  const [viewUsersActives, setViewUsersActives] = useState(true);

  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActives(!viewUsersActives)}
        />
        <span>
          {viewUsersActives ? "Usuarios activos" : "Usuarios inactivos"}
        </span>
      </div>
      {viewUsersActives
        ? UsersActive(usersActive)
        : UsersInactive(usersInactive)}
    </div>
  );
}

function UsersActive(usersActive) {
  return (
    <List
      className="user-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => console.log("Editar usuario.")}
            >
              <EditOutlined />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Desactivar usuario.")}
            >
              <StopOutlined />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Eliminar usuario.")}
            >
              <DeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`${user.name ? user.name : "..."}
            ${user.lastname ? user.lastname : "..."}`}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}

function UsersInactive(usersInactive) {
  return (
    <List
      className="user-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => console.log("Activar usuario.")}
            >
              <CheckOutlined />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Eliminar usuario.")}
            >
              <DeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`${user.name ? user.name : "..."}
                ${user.lastname ? user.lastname : "..."}`}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}
