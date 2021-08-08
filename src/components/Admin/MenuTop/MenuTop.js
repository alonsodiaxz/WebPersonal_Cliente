import React from "react";
import AlonsoLogo from "../../../assets/img/png/LABM.png";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  PoweroffOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { logout } from "../../../API/auth";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setmenuCollapsed } = props;

  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={AlonsoLogo}
          alt="Alonso Diaz Sobrino"
        />
        <Button type="link" onClick={() => setmenuCollapsed(!menuCollapsed)}>
          {
            menuCollapsed ? (
              <MenuUnfoldOutlined />
            ) : (
              <MenuFoldOutlined />
            ) /*Cambiar la posicion de la flecha dependiendo menuCollapsed*/
          }
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={logoutUser}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
