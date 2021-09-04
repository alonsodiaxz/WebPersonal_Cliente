import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import logoAlonso from "../../../assets/img/png/LABM.png";
import { getMenuApi } from "../../../API/menu";
import { getAccessToken } from "../../../API/auth";
import SocialLinks from "../SocialLinks/SocialLinks";

import "./MenuTop.scss";

export default function MenuTop() {
  const { Item } = Menu;
  const [menuData, setmenuData] = useState([]);
  const token = getAccessToken();

  useEffect(() => {
    getMenuApi(token)
      .then((response) => {
        const arrayMenu = [];
        response.menus.forEach((item) => {
          if (item.active) {
            arrayMenu.push(item);
          }
        });
        setmenuData(arrayMenu);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  return (
    <Menu className="menu-top-web" mode="horizontal">
      <Item className="menu-top-web__logo">
        <Link to={"/"}>
          <img src={logoAlonso} alt="Alonso Diaz Sobrino"></img>
        </Link>
      </Item>

      {menuData.map((item) => {
        const external = item.url.indexOf("http") > -1 ? true : false;

        //Rutas externas a nuestra pagina
        if (external) {
          return (
            <Item key={item._id} className="menu-top-web__item">
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.title}
              </a>
            </Item>
          );
        }

        //Rutas internas en nuestra página
        return (
          <Item key={item._id} className="menu-top-web__item">
            <Link to={item.url}> {item.title}</Link>
          </Item>
        );
      })}
      <Item className="menu-top-web__item">
        <Link to={"/admin"}> Admin</Link>
      </Item>
      <SocialLinks />
    </Menu>
  );
}
