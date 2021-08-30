import React, { useEffect, useState } from "react";
import { getMenuApi } from "../../../API/menu";
import { getAccessToken } from "../../../API/auth";
import MenuWebList from "../../../components/Admin/MenuWeb/MenuWebList";

export default function MenuWeb() {
  const [menu, setMenu] = useState([]);
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false);
  const token = getAccessToken();

  useEffect(() => {
    getMenuApi(token)
      .then((response) => {
        setMenu(response.menus);
      })
      .catch((err) => {
        return err;
      });

    setReloadMenuWeb(false);
  }, [reloadMenuWeb]);

  return (
    <div className="menu-web">
      <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
    </div>
  );
}
